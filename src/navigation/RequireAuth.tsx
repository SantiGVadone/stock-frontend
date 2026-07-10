import { useAuth } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { View, ActivityIndicator } from 'react-native'
import { Children, isValidElement, cloneElement } from 'react'

export const RequireAuth = ({
  children,
  ...props
}: { children: React.ReactNode } & Record<string, any>) => {
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
