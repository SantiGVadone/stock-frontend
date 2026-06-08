import * as SecureStore from 'expo-secure-store'
const TOKEN_KEY = 'user_session_token'

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
