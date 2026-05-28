import { useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import Ionicons from '@expo/vector-icons/Ionicons'

export function Login() {
  const navigation = useNavigation<any>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    // aca voy a enviar los datos de email y password al backend
    // espero resivir un token para guardar
    // si el login es exitoso hago un navigation.navigate('Stock')
    // si el login falla, osea que recibo un error del backend, muestro un mensaje de error al usuario
    navigation.navigate('Stock')
  }

  return (
    <SafeAreaView style={styles.fondo}>
      <StatusBar barStyle={'dark-content'} />
      <TouchableOpacity style={styles.back} onPress={() => {}}>
        <Ionicons name='arrow-back' size={30} color='black' />
      </TouchableOpacity>
      <View>
        <Text style={styles.welcome}>Inicio de Sesion</Text>
      </View>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Email'
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
            />

            <View>
              <TextInput
                placeholder='Contraseña'
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
              />
              <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                handleLogin()
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={styles.register}
          onPress={() => {
            navigation.navigate('Register')
          }}
        >
          ¿No tenes una cuenta?
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  back: {
    margin: 10,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'scroll',
  },
  welcome: {
    color: 'black',
    fontSize: 35,
    fontWeight: 600,
    margin: 10,
    marginBottom: 0,
    padding: 0,
    textAlign: 'center',
    fontFamily: 'Arial',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  form: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 15,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'gray',
    maxWidth: '80%',
    minWidth: '50%',
    textAlign: 'center',
    color: '#333333',
    marginVertical: 5,
    overflow: 'scroll',
    elevation: 7,
    fontSize: 17,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#09f',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 35,

    alignItems: 'center',
    justifyContent: 'center',
    elevation: 7,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 700,
  },
  forgot: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  register: {
    fontSize: 15,
    color: 'black',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 20,
  },
})
