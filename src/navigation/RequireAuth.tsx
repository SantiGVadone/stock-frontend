import { useAuth } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { View, ActivityIndicator } from 'react-native'

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
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

  return children
}
