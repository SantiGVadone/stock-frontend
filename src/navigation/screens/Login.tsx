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

export function Login() {
  const navigation = useNavigation<any>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading } = useStock()

  const handleLogin = async () => {
    try {
      login(email, password)
    } catch (error) {
      console.error('hubo un error en el login', error)
      // aca tiene que ir un toasmessage
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: '../../../assets/icon.png' }} // Logo Pro
            style={styles.logo}
            resizeMode='contain'
          />
          <Text style={styles.brandName}>StockPro</Text>
          <Text style={styles.subText}>Gestión de stock inteligente</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.welcomeText}>Iniciar Sesion</Text>

          <CustomInput
            label='Email'
            icon='mail-outline'
            placeholder='ejemplo@email.com'
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
            autoCapitalize='none'
            returnKeyType='next'
          />

          <CustomInput
            label='Password'
            icon='lock-closed-outline'
            placeholder='••••••••••••••••'
            value={password}
            onChangeText={setPassword}
            isPassword
            keyboardType='default'
            autoCapitalize='none'
            returnKeyType='next'
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              handleLogin()
            }}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Cargando...' : 'Ingresar'}
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
                navigation.navigate('Register')
              }}
            >
              ¿No tenes una cuenta?
            </Text>

            <Text
              style={{
                alignSelf: 'center',
                marginTop: 10,
                color: '#0061D9',
              }}
              onPress={() => {
                navigation.navigate('Register')
              }}
            >
              Registrate
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
    justifyContent: 'center',
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
