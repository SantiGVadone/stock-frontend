import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

interface EditUser {
  name?: string
  lastname?: string
  phone?: string
}

export const MyProfile = () => {
  const navigation = useNavigation<any>()
  const { user, isLoading } = useAuth()
  const [isEdit, setIsEdit] = useState(false)
  const initialUser = {
    name: user?.name,
    lastname: 'Vadone',
    phone: '+54 9 11 7366-1897',
    // lastname: user?.lastname,
    // phone: user?.phone
  }
  const [newUser, setNewUser] = useState<EditUser | null>(initialUser)

  return (
    <SafeAreaProvider style={styles.modal}>
      <TouchableOpacity
        style={styles.backdrop}
        onPress={() => navigation.goBack()}
        activeOpacity={1}
      />
      <KeyboardAvoidingView
        style={styles.modalContent}
        behavior={'padding'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Datos de Tu Perfil</Text>
          {/* <View style={styles.introSection}>
            <Text style={styles.subtitle}>
              Completa los detalles para añadir un nuevo producto a tu
              inventario.
            </Text>
          </View> */}

          {/* FORMULARIO */}
          {isEdit ? (
            <View style={styles.form}>
              <View style={styles.inputImageContainer}>
                <Image source={{}} style={styles.imageContainer} />
                <View style={styles.imageOverlay}>
                  <TouchableOpacity style={styles.selectButton}>
                    <Ionicons name='image-outline' size={18} color='#0061D9' />
                    <Text style={styles.selectButtonText}>
                      {/* SELECCIONAR IMAGEN */}
                      DESHABILITADO
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>NOMBRE</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder='Nombre...'
                    placeholderTextColor='#BBB'
                    onChangeText={(text) =>
                      setNewUser({ ...newUser, name: text })
                    }
                    value={newUser?.name}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>APELLIDO</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder='Apellido...'
                    placeholderTextColor='#BBB'
                    onChangeText={(text) =>
                      setNewUser({ ...newUser, lastname: text })
                    }
                    value={newUser?.lastname}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>TELEFONO</Text>
                <View style={styles.inputContainer}>
                  {/* <Ionicons
                        name='phone-portrait-outline'
                        size={20}
                        color='#666'
                        style={styles.inputIcon}
                      /> */}
                  <TextInput
                    style={styles.input}
                    placeholder='Telefono...'
                    placeholderTextColor='#BBB'
                    keyboardType='number-pad'
                    onChangeText={(text) => {
                      // const valor = text === '' ? 0 : parseInt(text)
                      // if (!isNaN(valor)) {
                      setNewUser({ ...newUser, phone: text })
                      // }
                    }}
                    value={newUser?.phone}
                  />
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={[styles.mainButton, isLoading && { opacity: 0.6 }]}
                  onPress={() => {
                    setIsEdit(!isEdit)
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Ionicons name='sync' size={28} color='#0061D9' spin />
                  ) : (
                    <Ionicons name='create-outline' size={28} color='#0061D9' />
                  )}
                  <Text style={styles.mainButtonText}>
                    {isLoading ? 'Editando...' : 'Confirmar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.inputImageContainer}>
                <Image source={{}} style={styles.imageContainer} />
                <View style={styles.imageOverlay}>
                  <TouchableOpacity style={styles.selectButton}>
                    <Ionicons name='image-outline' size={18} color='#0061D9' />
                    <Text style={styles.selectButtonText}>
                      {/* SELECCIONAR IMAGEN */}
                      DESHABILITADO
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>NOMBRE</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.input}>
                    <Text style={styles.textInfo}>{initialUser?.name}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>APELLIDO</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.input}>
                    <Text style={styles.textInfo}>{initialUser?.lastname}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>TELEFONO</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.input}>
                    <Text style={styles.textInfo}>{initialUser?.phone}</Text>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  style={[styles.mainButton, isLoading && { opacity: 0.6 }]}
                  onPress={() => {
                    setIsEdit(!isEdit)
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Ionicons name='sync' size={28} color='#FFF' spin />
                  ) : (
                    <Ionicons name='create-outline' size={28} color='#0061D9' />
                  )}
                  <Text style={styles.editingButtonText}>
                    {isLoading ? 'Redirigiendo...' : 'Editar Perfil'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgb(0,0,0,0.09)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    maxHeight: '70%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0061D9',
    textAlign: 'center',
  },
  scrollContent: { paddingBottom: 0, flexGrow: 1 },
  introSection: { marginBottom: 20 },
  titleAux: {
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
  form: { gap: 22, marginBottom: 24 },
  inputImageContainer: {
    alignSelf: 'center',
    height: 190,
    width: 190,
    borderRadius: 99,
    overflow: 'hidden',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#c9c9c9',
  },
  imageContainer: { width: '100%', height: '100%', opacity: 0.8 },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  selectButton: {
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
  selectButtonText: { fontSize: 13, fontWeight: 'bold', color: '#0061D9' },
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
  input: { flex: 1, fontSize: 25, color: '#1A1A1A' },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: -8,
  },
  typeCard: {
    width: '90%',
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
  textInfo: {
    fontSize: 25,
    fontWeight: '300',
  },
  footer: {
    paddingBottom: 0,
    paddingHorizontal: 24,
    gap: 10,
  },
  mainButton: {
    alignSelf: 'center',
    height: 56,
    backgroundColor: '#FFF',
    width: '60%',
    borderRadius: 16,
    borderColor: '#CCC',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    elevation: 3,
  },
  mainButtonText: { color: '#0061D9', fontSize: 22, fontWeight: 'bold' },
  editingButtonText: { color: '#0061D9', fontSize: 22, fontWeight: 'bold' },
  footerVersion: {
    textAlign: 'center',
    color: '#CCC',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
