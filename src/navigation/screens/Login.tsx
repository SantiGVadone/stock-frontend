import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export function Login() {
  const navigation = useNavigation<any>()
  return (
    <SafeAreaView style={styles.fondo}>
      <KeyboardAvoidingView
        style={{ flex: 1, height: '100%', overflow: 'scroll' }}
      >
        <View
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'space-evenly',
          }}
        >
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: 55,
                fontWeight: 700,
                margin: 10,
                marginBottom: 0,
                padding: 0,
                textAlign: 'center',
              }}
            >
              Welcome
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 30,
                fontWeight: 700,
                margin: 0,
                padding: 0,
                textAlign: 'center',
              }}
            >
              to StockApp
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextInput
              placeholder='User'
              autoCorrect={false}
              showSoftInputOnFocus={true}
              style={{
                height: 'auto',
                margin: 8,
                borderBottomWidth: 1,
                textAlign: 'center',
                fontSize: 20,
                maxWidth: '75%',
                minWidth: 100,
                overflow: 'scroll',
                borderRadius: 35,
              }}
              onChangeText={() => {}}
            />
            <TextInput
              placeholder='PassWord'
              autoCorrect={false}
              showSoftInputOnFocus={true}
              style={{
                height: 'auto',
                margin: 8,
                borderBottomWidth: 1,
                textAlign: 'center',
                fontSize: 20,
                maxWidth: '75%',
                minWidth: 100,
                overflow: 'scroll',
                borderRadius: 35,
              }}
              onChangeText={() => {}}
            />
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Stock')
              }}
              style={{
                margin: 0,
                backgroundColor: '#09f',
                alignSelf: 'center',
                padding: 15,
                borderRadius: 35,
              }}
            >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Stock')
              }}
              style={{
                margin: 0,
                backgroundColor: '#09f',
                alignSelf: 'center',
                padding: 15,
                borderRadius: 35,
              }}
            >
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 700 }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  fondo: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: 'lightgray',
    justifyContent: 'space-evenly',
  },
})
