import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Navigation } from './navigation/Navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export function App() {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
