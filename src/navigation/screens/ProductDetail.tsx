import { Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Feather from '@expo/vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import COLORS from '../../constants/colors'

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.edit}>
          <TouchableOpacity
            onPress={() => {
              ;(navigation.navigate as any)('EditProduct', {
                product: localProduct,
              })
            }}
          >
            <Feather name='edit' size={30} color='black' />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [navigation, localProduct])

  const handleAdd = async () => {
    let newQuantity = localProduct.quantity + 1

    try {
      const response = await fetch(
        `http://192.168.1.39:3000/api/products/${product.id}`,
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
      const response = await fetch(
        `http://192.168.1.39:3000/api/products/${localProduct.id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          {/* Aca va la imagen */}
          <View style={styles.imagePart}>
            <View style={styles.imageContainer}>
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Aca va a ir la Imagen del producto cargada desde la camara
              </Text>
            </View>
          </View>

          {/*Aca va el resto del contenido */}
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            {/*Conjunto de nombre y descripcion*/}
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.productName}>{localProduct.name}</Text>
              <Text style={styles.productDescription}>
                {localProduct.description}
              </Text>
            </View>
            {/* Conjunto para la cantidad */}
            <View style={{ alignItems: 'center', margin: 20 }}>
              <View style={styles.fastControlsContainer}>
                <TouchableOpacity onPress={handleSubstract}>
                  <Feather name='minus' size={30} color='black' />
                </TouchableOpacity>
                <Text style={styles.fastControlsQuantity}>
                  {localProduct.quantity}
                </Text>
                <TouchableOpacity onPress={handleAdd}>
                  <Feather name='plus' size={30} color='black' />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  edit: {
    width: '100%',
    alignItems: 'flex-end',
    padding: 15,
    paddingVertical: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  imagePart: {
    alignItems: 'center',
    margin: 10,
  },
  imageContainer: {
    height: 200,
    width: 200,
    backgroundColor: COLORS.oscuro,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    margin: 0,
    elevation: 4,
  },
  productName: {
    color: COLORS.oscuro,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: COLORS.softGray,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  },
  productDescription: {
    fontSize: 24,
    textAlign: 'center',
    alignItems: 'center',
    width: '60%',
  },
  fastControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.softGray,
    borderRadius: 99999,
    paddingHorizontal: 24,
    paddingVertical: 8,
    elevation: 3,
  },
  fastControlsQuantity: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 18,
  },
})
