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

interface RegisterUser {
  name: string
  lastName: string
  email: string
  phone: string
  password: string
}

export function Register() {
  const navigation = useNavigation<any>()
  const [user, setUser] = useState<RegisterUser>({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  })

  const handleRegister = () => {
    // aca voy a enviar todos los datos del usuario al backend para crear la cuenta
    // si el registro es exitoso (osea que resivo un 200) hago un navigation.navigate('Login')
    // si el registro no es exitoso, muestro un mensaje de error al usuario, ej: Email ya registrado
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.fondo}>
      <StatusBar barStyle={'dark-content'} />
      <TouchableOpacity style={styles.back} onPress={() => {}}>
        <Ionicons name='arrow-back' size={30} color='black' />
      </TouchableOpacity>
      <View>
        <Text style={styles.welcome}>Crear una cuenta</Text>
      </View>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Nombre'
              style={styles.input}
              onChangeText={(text) => setUser({ ...user, name: text })}
            />
            <TextInput
              placeholder='Apellido'
              style={styles.input}
              onChangeText={(text) => setUser({ ...user, lastName: text })}
            />
            <TextInput
              placeholder='Telefono'
              style={styles.input}
              onChangeText={(text) => setUser({ ...user, phone: text })}
            />
            <TextInput
              placeholder='Email'
              style={styles.input}
              onChangeText={(text) => setUser({ ...user, email: text })}
            />
            <TextInput
              placeholder='Contraseña'
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(text) => setUser({ ...user, password: text })}
            />
            <TextInput
              placeholder='Confirmar Contraseña'
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(text) => setUser({ ...user, password: text })}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Text style={styles.terms}>
              Creando esta cuenta usted acepta los términos y condiciones de uso
              y las políticas de privacidad
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleRegister()
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Crear Cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={styles.register}
          onPress={() => {
            navigation.navigate('Login')
          }}
        >
          ¿Ya estas registrado?
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
    marginBottom: 0,
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
  terms: {
    maxWidth: '80%',
    color: 'gray',
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 15,
  },
  register: {
    fontSize: 15,
    color: 'black',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 20,
  },
})
