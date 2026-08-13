import { useAuth } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { View, ActivityIndicator } from 'react-native'
import { Children, isValidElement, cloneElement } from 'react'

export const RequireAuth = ({
  children,
  ...props
}: { children: React.ReactNode } & Record<string, any>) => {
  /* POSIBLE SOLUCION AL LOGOUT ERROR
  const { isAuthenticated, isLoading } = useAuth()
  const navigation = useNavigation<any>()

  // 1. Manejamos la redirección como un efecto secundario
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigation.navigate('Login')
    }
  }, [isLoading, isAuthenticated, navigation])

  // 2. Si está cargando, mostramos el spinner
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#0061D9' />
      </View>
    )
  }

  // 3. Si no está autenticado, no renderizamos el contenido (esperamos que el useEffect redirija)
  if (!isAuthenticated) {
    return null
  }

  return Children.map(children, (child) =>
    isValidElement(child) ? cloneElement(child, props) : child,
  )
  */
  const { isAuthenticated, isLoading } = useAuth()
  const navigation = useNavigation<any>()

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#0061D9' />
      </View>
    )
  }

  if (!isAuthenticated) {
    navigation.navigate('Login')
    return null
  }

  return Children.map(children, (child) =>
    isValidElement(child) ? cloneElement(child, props) : child,
  )
}
