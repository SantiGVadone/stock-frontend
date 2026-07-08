import * as SecureStore from 'expo-secure-store'
const TOKEN_KEY = 'user_session_token'
const STORE_KEY = 'user_stores'

export const guardarToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token)
    console.log('Token guardado con éxito')
  } catch (error) {
    console.error('Error al guardar el token:', error)
  }
}

export const obtenerToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(TOKEN_KEY)
    return token
  } catch (error) {
    console.error('Error al obtener el token:', error)
    return null
  }
}

export const eliminarToken = async () => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY)
    console.log('Token eliminado')
  } catch (error) {
    console.error('Error al eliminar el token:', error)
  }
}

export interface Store {
  id: number
  name: string
  rol: string
}

export const guardarStores = async (stores: Store[]): Promise<void> => {
  try {
    const storesString = JSON.stringify(stores)
    await SecureStore.setItemAsync(STORE_KEY, storesString)
    console.log('Stores guardadas con éxito')
  } catch (error) {
    console.error('Error al guardar las stores:', error)
  }
}

export const obtenerStores = async (): Promise<Store[] | null> => {
  try {
    const storesString = await SecureStore.getItemAsync(STORE_KEY)
    if (storesString) {
      return JSON.parse(storesString) as Store[]
    }
    return null
  } catch (error) {
    console.error('Error al obtener las stores:', error)
    return null
  }
}

export const eliminarStores = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(STORE_KEY)
    console.log('Stores eliminadas')
  } catch (error) {
    console.error('Error al eliminar las stores:', error)
  }
}
