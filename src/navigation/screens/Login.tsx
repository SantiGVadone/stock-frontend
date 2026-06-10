import { useState } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { guardarToken, obtenerToken } from '../../utility/auth'

import { Ionicons } from '@expo/vector-icons'

const CustomInput = ({
  label,
  icon,
  value,
  onChangeText,
  isPassword = false,
  placeholder,
}: any) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons
          name={icon as any}
          size={20}
          color='#666'
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize='none'
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color='#666'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export function Login() {
  const navigation = useNavigation<any>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    // aca voy a enviar los datos de email y password al backend
    // const response = await fetch('https://vadonedev.com.ar/api/login')
    try {
      const response = await fetch(
        'https://api.vadonedev.com.ar/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Error en la peticion de login')
      }

      const data = await response.json()
      guardarToken(data.token)
      const token = await obtenerToken()
      console.log(token)
      navigation.navigate('Stock')
    } catch (error) {
      console.error('hubo un error en el login', error)
      // aca tiene que ir un toasmessage
    }
    // espero resivir un token para guardar
    // si el login es exitoso hago un navigation.navigate('Stock')
    // si el login falla, osea que recibo un error del backend, muestro un mensaje de error al usuario
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: '{{DATA:IMAGE:IMAGE_38}}' }} // Logo Pro
            style={styles.logo}
            resizeMode='contain'
          />
          <Text style={styles.brandName}>StockPro</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.welcomeText}>Bienvenido de nuevo</Text>
          <Text style={styles.subText}>Gestión de stock inteligente</Text>

          <CustomInput
            label='Email'
            icon='mail-outline'
            placeholder='ejemplo@empresa.com'
            value={email}
            onChangeText={setEmail}
          />

          <CustomInput
            label='Password'
            icon='lock-closed-outline'
            placeholder='••••••••'
            value={password}
            onChangeText={setPassword}
            isPassword
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? 'Cargando...' : 'Ingresar'}
            </Text>
            {!loading && (
              <Ionicons name='arrow-forward' size={20} color='#FFF' />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9FE' },
  scrollContainer: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 32 },
  logo: { width: 100, height: 100 },
  brandName: { fontSize: 28, fontWeight: 'bold', color: '#000', marginTop: 8 },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1A1A1A',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
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
  inputGroup: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 8 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, height: 48, fontSize: 16, color: '#1A1A1A' },
  eyeIcon: { padding: 8 },
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
  loginButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
})
