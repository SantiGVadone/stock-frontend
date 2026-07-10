import {
  obtenerStores,
  obtenerToken,
  guardarStores,
  guardarToken,
  Store,
  eliminarToken,
  eliminarStores,
} from '../utility/auth'
import { createContext, useState, useEffect, useContext } from 'react'
const API_URL = 'https://api.vadonedev.com.ar/api'

interface User {
  id: number
  name: string
  email: string
  stores: Store[]
}

interface AuthContextType {
  // Estado
  token: string | null
  user: User | null
  storeId: number | null
  stores: Store[] | null
  isAuthenticated: boolean
  isLoading: boolean

  //Acciones
  login: (email: string, password: string) => Promise<void>
  selectStore: (storeId: number) => void
  logout: () => Promise<void>
  addStore: (store: Store) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [storeId, setStoreId] = useState<number | null>(null)
  const [stores, setStores] = useState<Store[] | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const hidratar = async () => {
      setIsLoading(true)
      try {
        const [savedToken, savedStores] = await Promise.all([
          obtenerToken(),
          obtenerStores(),
        ])

        if (savedToken) {
          setToken(savedToken)
          setStores(Array.isArray(savedStores) ? savedStores : [])
          setIsAuthenticated(true)
        }
      } catch (e) {
        console.error('Error al hidratar el estado de autenticacion', e)
      } finally {
        setIsLoading(false)
      }
    }
    hidratar()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
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
      setToken(data.token)
      setUser(data.user)
      setStores(Array.isArray(data.user.stores) ? data.user.stores : [])
      setIsAuthenticated(true)
      setIsLoading(false)
    } catch (err: any) {
      console.error('Error en la peticion de login', err)
    } finally {
      setIsLoading(false)
    }
  }

  const selectStore = (storeId: number) => {
    setStoreId(storeId)
  }

  const logout = async () => {
    await eliminarToken()
    await eliminarStores()
    setToken(null)
    setUser(null)
    setStoreId(null)
    setStores(null)
    setIsAuthenticated(false)
  }

  const addStore = (store: Store) => {
    setStores((prev) => {
      const safeStores = Array.isArray(prev) ? prev : []
      const updated = safeStores ? [...safeStores, store] : [store]
      guardarStores(updated)
      return updated
    })
  }

  const value = {
    token,
    user,
    storeId,
    stores,
    isAuthenticated,
    isLoading,
    login,
    selectStore,
    logout,
    addStore,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
