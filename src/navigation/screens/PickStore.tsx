import { useEffect, useState } from 'react'
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Store } from '../../utility/auth' // Importamos el tipo Store que creamos antes
import { useStock } from '../../hooks/useStock'
import { Image } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../context/AuthContext'
export const PickStore = () => {
  const { refresh, loading } = useStock()
  const navigation = useNavigation<any>()
  const { stores, selectStore } = useAuth()

  if (!stores) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' color='#0061D9' />
      </View>
    )
  }

  const handleSelect = (id: number) => {
    selectStore(id)
    navigation.navigate('Stock')
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: '../../../assets/icono.png' }}
          style={styles.logo}
          resizeMode='contain'
        />
      </View>
      <View style={styles.logoContainer}>
        <Text style={styles.brandName}>StockPro</Text>
        <Text style={styles.subText}>Gestión de stock inteligente</Text>
        <Text style={[styles.brandName, { fontSize: 20 }]}>
          Seleccione una de sus tiendas
        </Text>
      </View>
      <FlatList
        data={stores}
        onRefresh={refresh}
        refreshing={loading}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              console.log('Seleccionaste la tienda:', item.name)
              handleSelect(item.id)
            }}
          >
            <View style={styles.productCard}>
              <View
                style={[styles.productIcon, { backgroundColor: '#F0F4FF' }]}
              >
                <Ionicons name='storefront-outline' size={24} color='#0061D9' />
              </View>

              <View style={styles.productInfo}>
                <Text
                  style={styles.productName}
                  numberOfLines={2}
                  ellipsizeMode='tail'
                >
                  {item.name}
                </Text>
              </View>

              <View style={styles.qtyContainer}>
                <Text style={[styles.rolValue, { color: '#0061D9' }]}>
                  {item.rol.toUpperCase()}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {}}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Crear Tienda</Text>
        <Ionicons name='arrow-forward' size={25} color='#FFF' />
      </TouchableOpacity>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAF9FE',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 250,
    height: 250,
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 8,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: 4,
  },
  container: { flex: 1, backgroundColor: '#FAF9FE', paddingTop: 25 },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  productIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  productInfo: { flex: 1 },
  productName: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  qtyContainer: { alignItems: 'flex-end' },
  rolValue: { fontSize: 18, fontWeight: 'bold', letterSpacing: 0.5 },

  button: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 30,
    alignSelf: 'center',
    width: '80%',
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0061D9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0061D9',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    gap: 10,
  },
  buttonText: {
    textAlignVertical: 'center',
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
})
