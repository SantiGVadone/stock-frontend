import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'

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

export const useStock = () => {
  const [stock, setStock] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigation = useNavigation<any>()

  const fetchStock = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://192.168.1.39:3000/api/products')
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
      const response = await fetch(
        `http://192.168.1.39:3000/api/products/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        },
      )
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
      const response = await fetch('http://192.168.1.39:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          quantity: Number(product.quantity),
          category: product.category,
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

  const editProduct = async (newProduct: Product) => {
    try {
      setLoading(true)
      const response = await fetch(
        `http://192.168.1.39:3000/api/products/${newProduct.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: newProduct.name,
            description: newProduct.description,
            quantity: Number(newProduct.quantity),
            category: newProduct.category,
          }),
        },
      )
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

  return {
    stock,
    loading,
    error,
    refresh: fetchStock,
    removeProduct,
    addProduct,
    editProduct,
  }
}
