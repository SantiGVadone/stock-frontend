import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useStock } from '../../hooks/useStock'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaProvider } from 'react-native-safe-area-context'

interface Product {
  name: string
  description: string
  quantity: number
  category: string
}

export function AddProduct() {
  const navigation = useNavigation()
  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    quantity: 0,
    category: '',
  })
  const { addProduct, loading } = useStock()

  return (
    <SafeAreaProvider style={styles.modal}>
      <TouchableOpacity
        style={styles.backdrop}
        onPress={() => navigation.goBack()}
        activeOpacity={1}
      />
      <KeyboardAvoidingView
        style={styles.modalContent}
        behavior='padding'
        keyboardVerticalOffset={0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Añadir un Producto</Text>
          <View style={styles.introSection}>
            <Text style={styles.subtitle}>
              Completa los detalles para añadir un nuevo producto a tu
              inventario.
            </Text>
          </View>

          {/* FORMULARIO */}
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
              <Text style={styles.inputLabel}>NOMBRE DEL PRODUCTO</Text>
              <View style={styles.inputContainer}>
                {/* <Ionicons
                    name='business-outline'
                    size={20}
                    color='#666'
                    style={styles.inputIcon}
                  /> */}
                <TextInput
                  style={styles.input}
                  placeholder='Nombre Del Producto...'
                  placeholderTextColor='#BBB'
                  onChangeText={(text) =>
                    setProduct({ ...product, name: text })
                  }
                  value={product.name}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>DESCRIPCIÓN</Text>
              <View style={styles.inputContainer}>
                {/* <Ionicons
                    name='location-outline'
                    size={20}
                    color='#666'
                    style={styles.inputIcon}
                  /> */}
                <TextInput
                  style={styles.input}
                  placeholder='Descripcion del Producto...'
                  placeholderTextColor='#BBB'
                  onChangeText={(text) =>
                    setProduct({ ...product, description: text })
                  }
                  value={product.description}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CANTIDAD</Text>
              <View style={styles.inputContainer}>
                {/* <Ionicons
                    name='phone-portrait-outline'
                    size={20}
                    color='#666'
                    style={styles.inputIcon}
                  /> */}
                <TextInput
                  style={styles.input}
                  placeholder='Cantidad Inicial...'
                  placeholderTextColor='#BBB'
                  keyboardType='number-pad'
                  onChangeText={(text) => {
                    const valor = text === '' ? 0 : parseInt(text)
                    if (!isNaN(valor)) {
                      setProduct({ ...product, quantity: valor })
                    }
                  }}
                  value={
                    product.quantity === 0 && product.quantity !== undefined
                      ? ''
                      : product.quantity.toString()
                  }
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CATEGORIA</Text>
              <View style={styles.inputContainer}>
                {/* <Ionicons
                    name='location-outline'
                    size={20}
                    color='#666'
                    style={styles.inputIcon}
                  /> */}
                <TextInput
                  style={styles.input}
                  placeholder='Categoria del Producto...'
                  placeholderTextColor='#BBB'
                  onChangeText={(text) =>
                    setProduct({ ...product, category: text })
                  }
                  value={product.category}
                />
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.mainButton, loading && { opacity: 0.6 }]}
              onPress={() => {
                addProduct(product)
              }}
              disabled={loading}
            >
              {loading ? (
                <Ionicons name='sync' size={28} color='#FFF' spin />
              ) : (
                <Ionicons name='add-circle-outline' size={28} color='#FFF' />
              )}
              <Text style={styles.mainButtonText}>
                {loading ? 'Creando...' : 'Crear Producto'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButton, loading && { opacity: 0.6 }]}
              onPress={() => {
                navigation.goBack()
              }}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>
                {loading ? 'Espere...' : 'Cancelar'}
              </Text>
            </TouchableOpacity>
          </View>
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
    maxHeight: '80%',
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
    height: 180,
    borderRadius: 16,
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
  input: { flex: 1, fontSize: 16, color: '#1A1A1A' },
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
  footer: {
    paddingBottom: 0,
    paddingHorizontal: 24,
    gap: 10,
  },
  mainButton: {
    height: 56,
    backgroundColor: '#0061D9',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  mainButtonText: { color: '#FFF', fontSize: 22, fontWeight: 'bold' },
  cancelButton: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ff5353',
    fontSize: 22,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
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
