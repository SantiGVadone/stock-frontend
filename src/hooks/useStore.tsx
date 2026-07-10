import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_URL = 'https://api.vadonedev.com.ar/api'

interface Store {
  id: number
  name: string
  rol?: string
  location?: string
  phone?: string | number
}

export interface AddNewStore {
  name: string
  location: string
  phone: string
}

export const useStore = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { token, addStore } = useAuth()

  const newStore = async (store: AddNewStore) => {
    setLoading(true)
    if (!store.name || !store.location || !store.phone) {
      alert('Todos los campos son obligatorios.')
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/stores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: store.name,
          location: store.location,
          phone: store.phone,
        }),
      })
      if (!response.ok) {
        const errorDetail = await response.text()
        setError(errorDetail)
        console.error('Error al guardar en la base de datos', errorDetail)
      } else {
        const createdStore = await response.json()
        addStore(createdStore)
      }
    } catch (error) {
      console.error(error)
      alert('No se pudo crear la Tienda')
    } finally {
      setLoading(false)
    }
  }

  return { newStore, loading, error }
}
