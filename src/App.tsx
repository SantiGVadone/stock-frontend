import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Navigation } from './navigation/Navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { AuthProvider } from './context/AuthContext'

export function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
