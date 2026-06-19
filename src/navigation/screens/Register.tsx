import { useState } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { CustomInput } from '../../components/CustomInput'
import { useNavigation } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons'
import { useStock } from '../../hooks/useStock'
import { CustomInputMid } from '../../components/CustomInputMid'


// interface RegisterUser {
//   name: string
//   lastName: string
//   email: string
//   phone: string
//   password: string
// }


export function Register() {
  const navigation = useNavigation<any>()
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const { register, loading } = useStock()

  const handleRegister = async () => {
    try {
      const user = {name, lastName, email, phone, password}
      register(user)
    } catch (error) {
      console.error('hubo un error en el register', error)
      // aca tiene que ir un toasmessage
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={{alignItems: 'center',marginBottom: 32}}>  
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 35, justifyContent: 'center'}}>
            <Image
            source={{ uri: 'https://png.pngtree.com/element_our/png/20180911/background-material-design-for-lorem-ipsum-logo-png_89719.jpg' }} // Logo Pro
            style={{ width: 100, height: 100,}}
            resizeMode='contain'
            />
          <Text style={styles.brandName}>StockPro</Text>
          </View>
          <Text style={styles.subText}>Gestión de stock inteligente</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.welcomeText}>Crear Cuenta</Text>

            <View
            style={{flex: 1, flexDirection: 'row', gap: 30}}>
            <CustomInputMid
            label='Nombre'
            icon='person-outline'
            placeholder='Juan'
            value={name}
            onChangeText={setName}
          />
          <CustomInputMid
            label='Apellido'
            icon='person-outline'
            placeholder='Perez'
            value={lastName}
            onChangeText={setLastName}
          />
            </View>

          <CustomInput
            label='Telefono'
            icon='phone-portrait-outline'
            placeholder='+54 9 11 11111111'
            value={phone}
            onChangeText={setPhone}
          />
          <CustomInput
            label='Email'
            icon='mail-outline'
            placeholder='ejemplo@email.com'
            value={email}
            onChangeText={setEmail}
          />

          <CustomInput
            label='Password'
            icon='lock-closed-outline'
            placeholder='••••••••••••••••'
            value={password}
            onChangeText={setPassword}
            isPassword
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              handleRegister()
            }}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Cargando...' : 'Registrar'}
            </Text>
            {!loading && (
              <Ionicons name='arrow-forward' size={20} color='#FFF' />
            )}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              gap: 7,
            }}
          >
            <Text
              style={{
                alignSelf: 'center',
                marginTop: 10,
                color: '#666',
              }}
              onPress={() => {
                navigation.navigate('Login')
              }}
            >
              ¿Ya tenes una cuenta?
            </Text>

            <Text
              style={{
                alignSelf: 'center',
                marginTop: 10,
                color: '#0061D9',
              }}
              onPress={() => {
                navigation.navigate('Login')
              }}
            >
              Ingresa
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FE',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'space-evenly',
    
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 100,
    height: 100,
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1A1A1A',
    marginBottom: 30,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },

  loginButton: {
    backgroundColor: '#0061D9',
    borderRadius: 12,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
