import { useLayoutEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useStock } from '../../hooks/useStock'
import { obtenerToken } from '../../utility/auth'

const { width } = Dimensions.get('window')

interface Product {
  id: number
  name: string
  description: string
  quantity: number
  category: string
}

export const ProductDetail = ({ route }: any) => {
  const navigation = useNavigation()
  const { product } = route.params
  const [localProduct, setLocalProduct] = useState<Product>(product)
  const { removeProduct } = useStock()

  const handleAdd = async () => {
    let newQuantity = localProduct.quantity + 1

    try {
      const response = await fetch(
        `https://api.vadonedev.com.ar/api/products/${product.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...localProduct,
            quantity: Number(newQuantity),
          }),
        },
      )
      if (response.ok) {
        setLocalProduct({ ...localProduct, quantity: newQuantity })
      } else {
        const errorDetail = await response.json()
        console.log('Error al guardar en la base de datos', errorDetail)
      }
    } catch (error) {
      console.error(error)
      alert('No se pudo conectar con la notebook')
    }
  }

  const handleSubstract = async () => {
    if (localProduct.quantity <= 0) return
    const newQuantity = localProduct.quantity - 1

    try {
      const token = obtenerToken()
      const id = localProduct.id
      const response = await fetch(
        `https://api.vadonedev.com.ar/api/products/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-store-id': '1',
          },
          body: JSON.stringify({
            ...localProduct,
            quantity: Number(newQuantity),
          }),
        },
      )
      if (response.ok) {
        setLocalProduct({ ...localProduct, quantity: newQuantity })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            ;(navigation.navigate as any)('EditProduct', {
              product: localProduct,
            })
          }}
        >
          <Ionicons name='create-outline' size={30} color='#0061D9' />
        </TouchableOpacity>
      ),
    })
  }, [navigation, localProduct])

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <View style={styles.placeholderImage}>
            <Ionicons name='image-outline' size={80} color='#0061D9' />
          </View>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: product.quantity >= 3 ? '#E5F9E0' : '#FFF0F0',
              },
            ]}
          >
            <Text
              style={[
                styles.statusText,
                { color: product.quantity >= 3 ? '#2E7D32' : '#E53935' },
              ]}
            >
              {product.quantity >= 3 ? 'EN STOCK' : 'BAJO STOCK'}
            </Text>
          </View>
        </View>

        <View style={styles.infoContent}>
          <View style={styles.titleRow}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>
                {product.category.toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={styles.stockCard}>
            <View>
              <Text style={styles.stockLabel}>CANTIDAD ACTUAL</Text>
              <Text style={styles.stockValue}>{product.quantity} unidades</Text>
            </View>
            <View style={styles.stockActions}>
              <TouchableOpacity
                style={styles.stockCircle}
                onPress={handleSubstract}
              >
                <Ionicons name='remove' size={24} color='#1A1A1A' />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.stockCircle, { backgroundColor: '#0061D9' }]}
                onPress={handleAdd}
              >
                <Ionicons name='add' size={24} color='#FFF' />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailsList}>
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Ionicons name='document-text-outline' size={20} color='#666' />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.detailLabel}>DESCRIPCIÓN</Text>
                <Text style={styles.descriptionText}>
                  {product.description}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeProduct(product.id)}
        >
          <Ionicons name='trash-outline' size={20} color='#E53935' />
        </TouchableOpacity>
        {/*<TouchableOpacity style={styles.mainButton}>
          <Text style={styles.mainButtonText}>Actualizar Stock</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9FE' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: '#FFF',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width,
    height: 280,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: { fontSize: 12, fontWeight: 'bold' },
  infoContent: {
    padding: 24,
    backgroundColor: '#FAF9FE',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  categoryBadge: {
    backgroundColor: '#0061D9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 2,
  },
  categoryText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  productName: {
    width: '75%',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  stockCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  stockLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 4,
  },
  stockValue: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  stockActions: { flexDirection: 'row', gap: 12 },
  stockCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F6F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsList: { gap: 20 },
  detailItem: { flexDirection: 'row', gap: 16 },
  detailIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 2,
  },
  detailValue: { fontSize: 16, color: '#1A1A1A', fontWeight: '500' },
  descriptionText: { fontSize: 15, color: '#666', lineHeight: 22 },
  footer: {
    padding: 24,
    alignItems: 'flex-end',
    // flexDirection: 'row',
    // gap: 12,
    // backgroundColor: '#FFF',
    // borderTopWidth: 1,
    // borderTopColor: '#F0F0F0',
  },
  deleteButton: {
    // width: 120,
    // height: 56,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    // flexDirection: 'row',
    // gap: 8,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  // deleteText: { color: '#E53935', fontSize: 16, fontWeight: 'bold' },
  mainButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#0061D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  mainButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
})
