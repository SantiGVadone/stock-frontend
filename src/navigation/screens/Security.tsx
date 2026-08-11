import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SecurityCard } from '../../components/SecurityCard'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../context/AuthContext'

export const Security = ({ navigation }: any) => {
  const nav = useNavigation<any>()
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { user } = useAuth()

  const handleUpdatePassword = () => {
    console.log('Contraseña actual:', currentPassword)
    console.log('Nueva contraseña:', newPassword)
    console.log('Confirmar contraseña:', confirmPassword)
    // todavia no tengo el endpoint para cambiar la contraseña, asi que solo hago un console.log
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => nav.goBack()}
        >
          <Ionicons name='arrow-back' size={30} color='#1F1F1F' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seguridad</Text>
        <View style={{ width: 40 }}></View>
      </View>

      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={0}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* BIOMETRIC LOGIN */}
          <SecurityCard icon='finger-print-outline' title='Ingreso Biometrico'>
            <View style={styles.pendingBadge}>
              <Ionicons name='alert-circle-outline' size={14} color='#E53935' />
              <Text style={styles.pendingText}>
                Deshabilitado Temporalmente
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.rowTextContent}>
                <Text style={styles.rowTitle}>FaceID / Fingerprint</Text>
              </View>
              <Switch
                style={{
                  transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                }}
                value={biometricEnabled} // deberia setear el ingreso mediante biometria en el backend, pero por ahora solo es visual
                onValueChange={(value) => {
                  setBiometricEnabled(value)
                  console.log(
                    'Cambio el valor de ingreso biometrico a: ',
                    value,
                  )
                }}
                trackColor={{ false: '#D1D1D1', true: '#0061D9' }}
                thumbColor='#FFF'
              />
            </View>
            <Text style={styles.rowDescription}>
              Activa el ingreso rapido y seguro usando los sensores biometricos
              de tu dispositivo. No mas escribir contraseñas.
            </Text>
          </SecurityCard>

          {/* EMAIL VERIFICATION */}
          <SecurityCard icon='mail-outline' title='Verificación de Email'>
            <View style={styles.pendingBadge}>
              <Ionicons name='alert-circle-outline' size={14} color='#E53935' />
              <Text style={styles.pendingText}>
                Deshabilitado Temporalmente
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.rowTextContent}>
                <Text style={styles.rowTitle}>{user?.email}</Text>
              </View>
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={() => {
                  console.log('Solicitud de Verificar Email enviada')
                  //todavia no tengo el endpoint para enviar la req
                }}
              >
                <Text style={styles.verifyButtonText}>Verificar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.rowDescription}>
              Verifica tu Email para desbloquear todas las funciones y asegurar
              la recuperacion de tu cuenta.
            </Text>
          </SecurityCard>

          {/* CHANGE PASSWORD */}
          <SecurityCard icon='key-outline' title='Cambiar Contraseña'>
            <View style={styles.pendingBadge}>
              <Ionicons name='alert-circle-outline' size={14} color='#E53935' />
              <Text style={styles.pendingText}>
                Deshabilitado Temporalmente
              </Text>
            </View>
            <Text style={styles.rowDescription}>
              Actualizar las credenciales de tu cuenta.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contraseña Actual</Text>
              <TextInput
                style={styles.input}
                placeholder='Ingrese la contraseña actual'
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nueva Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder='Ingrese la nueva contraseña'
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <Text style={styles.hintText}>
                Debe tener al menos 8 caracteres y contener un número.
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirmar Nueva Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder='Confirme la nueva contraseña'
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#0061D9',
                  padding: 12,
                  borderRadius: 12,
                  alignItems: 'center',
                  marginHorizontal: 15,
                }}
                onPress={handleUpdatePassword}
              >
                <Text
                  style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}
                >
                  Actualizar la Contraseña
                </Text>
              </TouchableOpacity>
            </View>
          </SecurityCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9FE' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    height: 64,
    backgroundColor: '#FAF9FE',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#0061D9' },
  backButton: { padding: 4 },
  menuButton: { padding: 8 },
  scrollContent: { padding: 20, gap: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  rowTextContent: {
    flex: 1,
    paddingRight: 16,
    alignSelf: 'center',
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  rowDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  pendingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
    gap: 4,
  },
  pendingText: { fontSize: 12, fontWeight: 'bold', color: '#E53935' },
  verifyButton: {
    backgroundColor: '#0061D9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  verifyButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  inputGroup: { marginBottom: 16 },
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 48,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1A1A1A',
  },
  hintText: { fontSize: 12, color: '#999', marginTop: 6, lineHeight: 18 },
})
