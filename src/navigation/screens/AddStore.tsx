import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useStore } from '../../hooks/useStore'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')

export const AddStore = ({ navigation }: any) => {
  const nav = useNavigation<any>()
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [phone, setPhone] = useState('')

  const { newStore, loading } = useStore()

  const handleCreate = async () => {
    try {
      console.log('crenado la tienda: Store', name, location, phone)
      const store = { name, location, phone }
      newStore(store)
      nav.navigate('PickStore')
    } catch (e) {
      console.error('Error creando una nueva tienda: ', e)
    }
  }

  return (
    <SafeAreaProvider style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => nav.goBack()}
        >
          <Ionicons name='arrow-back' size={24} color='#0061D9' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nueva Tienda</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.introSection}>
            <Text style={styles.title}>Registro de Sucursal</Text>
            <Text style={styles.subtitle}>
              Completa los detalles para añadir una nueva ubicación a tu red de
              inventario.
            </Text>
          </View>

          {/* FORMULARIO */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>NOMBRE DE LA TIENDA</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name='business-outline'
                  size={20}
                  color='#666'
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Ej: Bussines Center'
                  placeholderTextColor='#BBB'
                  onChangeText={setName}
                  value={name}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>UBICACIÓN / DIRECCIÓN</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name='location-outline'
                  size={20}
                  color='#666'
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Calle, Número...'
                  placeholderTextColor='#BBB'
                  onChangeText={setLocation}
                  value={location}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>TELEFONO / MOVIL</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name='phone-portrait-outline'
                  size={20}
                  color='#666'
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder='+54 11 1234 5678'
                  placeholderTextColor='#BBB'
                  onChangeText={setPhone}
                  value={phone}
                />
              </View>
            </View>

            {/* ASIGNAR ADMIN */}
            <TouchableOpacity style={styles.assignCard}>
              <View style={styles.assignIcon}>
                <Ionicons name='person-outline' size={20} color='#FFF' />
              </View>
              <View style={styles.assignContent}>
                <Text style={styles.assignTitle}>Asignar Empleados</Text>
                <Text style={styles.assignSubtitle}>EN MANTENIMIENTO</Text>
              </View>
              <Ionicons name='chevron-forward' size={20} color='#666' />
            </TouchableOpacity>

            <View style={styles.mapContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1000&auto=format&fit=crop',
                }}
                style={styles.mapImage}
                resizeMode='cover'
              />
              <View style={styles.mapOverlay}>
                <TouchableOpacity style={styles.detectButton}>
                  <Ionicons name='navigate-outline' size={18} color='#0061D9' />
                  <Text style={styles.detectButtonText}>
                    DETECTAR UBICACIÓN
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.mainButton, loading && { opacity: 0.6 }]}
            onPress={handleCreate}
            disabled={loading}
          >
            {loading ? (
              <Ionicons name='sync' size={24} color='#FFF' spin />
            ) : (
              <Ionicons name='add-circle-outline' size={24} color='#FFF' />
            )}
            <Text style={styles.mainButtonText}>
              {loading ? 'Creando...' : 'Crear Sucursal'}
            </Text>
          </TouchableOpacity>
        </View>
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
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    backgroundColor: '#FAF9FE',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#0061D9' },
  backButton: { padding: 8 },
  scrollContent: { padding: 24, paddingTop: 10, paddingBottom: 40 },
  introSection: { marginBottom: 32 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    lineHeight: 22,
    textAlign: 'center',
  },
  form: { gap: 24 },
  inputGroup: { gap: 8 },
  inputLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: '#1A1A1A' },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: -8,
  },
  typeCard: {
    width: (width - 60) / 2,
    height: 100,
    backgroundColor: '#FFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    gap: 8,
  },
  typeCardSelected: {
    borderColor: '#0061D9',
    backgroundColor: '#F0F6FF',
  },
  typeLabel: { fontSize: 11, fontWeight: 'bold', color: '#666' },
  typeLabelSelected: { color: '#0061D9' },
  assignCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6F8',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  assignIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#7B61FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  assignContent: { flex: 1 },
  assignTitle: { fontSize: 15, fontWeight: 'bold', color: '#1A1A1A' },
  assignSubtitle: { fontSize: 13, color: '#666' },
  mapContainer: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  mapImage: { width: '100%', height: '100%', opacity: 0.8 },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  detectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 8,
  },
  detectButtonText: { fontSize: 13, fontWeight: 'bold', color: '#0061D9' },
  footer: {
    paddingBottom: 0,
    paddingHorizontal: 24,
    backgroundColor: '#FAF9FE',
  },
  mainButton: {
    height: 56,
    backgroundColor: '#005AC1',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  mainButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  footerVersion: {
    textAlign: 'center',
    color: '#CCC',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
})
