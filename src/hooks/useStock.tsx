import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'

import { guardarToken, obtenerToken, guardarStores } from '../utility/auth'
const API_URL = 'https://api.vadonedev.com.ar/api'

interface Product {
  id: number
  name: string
  description: string
  quantity: number
  category: string
}

interface AddProduct {
  name: string
  description: string
  quantity: number
  category: string
}

interface RegisterUser {
  name: string
  lastName: string
  email: string
  phone: string
  password: string
}

export const useStock = () => {
  const [stock, setStock] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigation = useNavigation<any>()

  const register = async (user: RegisterUser) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          password: user.password,
        }),
      })
      if (!response.ok) {
        const errorDetail = await response.text()
        console.error(errorDetail)
        throw new Error('Error en la peticion de register')
      }
      navigation.navigate('Login')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      if (!response.ok) {
        throw new Error('Error en la peticion de login')
      }

      const data = await response.json()
      guardarToken(data.token)
      guardarStores(data.user.stores)
      setLoading(false)
      navigation.navigate('PickStore')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchStock = async () => {
    try {
      setLoading(true)
      const token = await obtenerToken()
      const response = await fetch(`${API_URL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'x-store-id': '1',
        },
      })
      if (!response.ok) throw new Error('Error al conectar con el servidor')

      const data = await response.json()
      setStock(data)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStock()
  }, [])

  const removeProduct = async (id: number) => {
    try {
      setLoading(true)
      const token = await obtenerToken()
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-store-id': '1',
        },
      })
      setLoading(false)
      navigation.goBack()
      if (!response.ok) throw new Error('Error al conectar con el servidor')
    } catch (err: any) {
      setError(err.message)
    } finally {
      fetchStock()
      setLoading(false)
    }
  }

  const addProduct = async (product: AddProduct) => {
    if (!product.name || !product.description || !product.quantity) {
      alert('Necesitas completar todos los campos')
      setLoading(false)
      navigation.navigate('Stock')

      return
    }
    try {
      setLoading(true)
      const token = await obtenerToken()
      const response = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'x-store-id': '1',
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          quantity: Number(product.quantity),
          category: product.category,
        }),
      })
      if (!response.ok) {
        const errorDetail = await response.text()
        console.log('Error al guardar en la base de datos', errorDetail)
      }
    } catch (error) {
      console.error(error)
      alert('No se pudo conectar con el servidor')
    } finally {
      fetchStock()
      setLoading(false)
      navigation.navigate('Stock')
    }
  }

  const editProduct = async (newProduct: Product) => {
    try {
      setLoading(true)
      const token = await obtenerToken()
      const response = await fetch(`${API_URL}/products/${newProduct.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'x-store-id': '1',
        },
        body: JSON.stringify({
          name: newProduct.name,
          description: newProduct.description,
          quantity: Number(newProduct.quantity),
          category: newProduct.category,
        }),
      })
      if (!response.ok) {
        const errorDetail = await response.json()
        console.log('Error al guardar en la base de datos', errorDetail)
      }
    } catch (error) {
      console.error(error)
      alert('No se pudo conectar con el servidor')
    } finally {
      fetchStock()
      setLoading(false)
      navigation.navigate('Stock')
    }
  }
  const handleAdd = async (product: Product) => {
    setLoading(true)
    const newQuantity = product.quantity + 1
    const token = await obtenerToken()

    try {
      const response = await fetch(`${API_URL}/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-store-id': '1',
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          category: product.category,
          quantity: Number(newQuantity),
        }),
      })
      if (!response.ok) {
        const errorDetail = await response.text()
        console.error('Error al guardar en la Base de Datos: ', errorDetail)
      }
      setError(null)
    } catch (e) {
      setError('Error en handleAdd')
      console.error('Error de conexion con el servidor', e)
    } finally {
      setLoading(false)
      fetchStock()
    }
  }

  const handleSubstract = async (product: Product) => {
    setLoading(true)
    const newQuantity = product.quantity - 1
    const token = await obtenerToken()

    try {
      const response = await fetch(`${API_URL}/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-store-id': '1',
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          category: product.category,
          quantity: Number(newQuantity),
        }),
      })
      if (!response.ok) {
        const errorDetail = await response.text()
        console.error('Error al guardar en la Base de Datos: ', errorDetail)
      }
      setError(null)
    } catch (e) {
      setError('Error en handleAdd')
      console.error('Error de conexion con el servidor', e)
    } finally {
      setLoading(false)
      fetchStock()
    }
  }

  return {
    register,
    login,
    stock,
    loading,
    error,
    refresh: fetchStock,
    removeProduct,
    addProduct,
    editProduct,
    handleAdd,
    handleSubstract,
  }
}
