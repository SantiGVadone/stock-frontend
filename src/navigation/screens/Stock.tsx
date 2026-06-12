import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Animated,
  Dimensions,
  ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useStock } from '../../hooks/useStock'
import COLORS from '../../constants/colors'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')

export function Stock() {
  const navigation = useNavigation<any>()
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const searchWidth = useState(new Animated.Value(48))[0]
  const { stock, loading, removeProduct, refresh } = useStock()
  const [search, setSearch] = useState('')

  if (search.length < 0) {
    console.log('este es el stock: ', stock)
  }
  console.log(stock)
  const filteredProducts = stock.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  )

  const renderRightActions = (id: number) => {
    return (
      <TouchableOpacity
        onPress={() => removeProduct(id)}
        style={styles.deleteBotton}
      >
        <AntDesign name='delete' size={28} color='white' />
      </TouchableOpacity>
    )
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' color='#3b82f6' />
      </View>
    )
  }
  const toggleSearch = () => {
    Animated.spring(searchWidth, {
      toValue: isSearchExpanded ? 48 : width - 120,
      useNativeDriver: false,
    }).start()
    setIsSearchExpanded(!isSearchExpanded)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER DINÁMICO */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.userButton}>
          <View style={{}}>
            <Ionicons name='person' size={24} color='#0061D9' />
          </View>
        </TouchableOpacity>

        {!isSearchExpanded && (
          <Text style={styles.headerTitle}>Inventario</Text>
        )}

        <View style={styles.headerRight}>
          <Animated.View
            style={[styles.searchContainer, { width: searchWidth }]}
          >
            <TouchableOpacity
              onPress={toggleSearch}
              style={styles.searchIconButton}
            >
              <Ionicons
                name={isSearchExpanded ? 'close' : 'search'}
                size={24}
                color='#1A1A1A'
              />
            </TouchableOpacity>
            {isSearchExpanded && (
              <TextInput
                style={styles.searchInput}
                placeholder='Buscar producto...'
                autoFocus
              />
            )}
          </Animated.View>

          {!isSearchExpanded && (
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons name='filter-outline' size={24} color='#1A1A1A' />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* LISTA DE PRODUCTOS */}
      <View style={styles.content}>
        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>PRODUCTOS</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{stock.length} Items</Text>
          </View>
        </View>

        <FlatList
          data={filteredProducts}
          onRefresh={refresh}
          refreshing={loading}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item.id)}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() =>
                  navigation.navigate('ProductDetail', { product: item })
                }
              >
                <View style={styles.productCard}>
                  <View
                    style={[
                      styles.productIcon,
                      {
                        backgroundColor:
                          item.quantity < 3 ? '#FFF0F0' : '#F0F4FF',
                      },
                    ]}
                  >
                    <Ionicons
                      name={
                        item.name.includes('Café')
                          ? 'cafe-outline'
                          : 'beaker-outline'
                      }
                      size={24}
                      color={item.quantity < 3 ? '#E53935' : '#0061D9'}
                    />
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productDesc}>{item.description}</Text>
                  </View>
                  <View style={styles.qtyContainer}>
                    <Text
                      style={[
                        styles.qtyValue,
                        {
                          color: item.quantity < 3 ? '#E53935' : '#0061D9',
                        },
                      ]}
                    >
                      {item.quantity}
                    </Text>
                    <Text style={styles.qtyLabel}>
                      {item.quantity < 3 ? 'BAJO STOCK' : 'CANT.'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Swipeable>
          )}
        />
      </View>
      {/* BOTÓN FLOTANTE AGREGAR */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name='add' size={32} color='#FFF' />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  deleteBotton: {
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    width: 95,
    margin: 5,
    marginLeft: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
  },
  container: { flex: 1, backgroundColor: '#FAF9FE' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 70,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
  userButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6F8',
    borderRadius: 24,
    height: 48,
    overflow: 'hidden',
  },
  searchIconButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: { flex: 1, fontSize: 16, color: '#1A1A1A', paddingRight: 15 },
  filterButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { flex: 1, padding: 20 },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    letterSpacing: 1,
  },
  badge: {
    backgroundColor: '#0061D9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
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
  productDesc: { fontSize: 14, color: '#666', marginTop: 2 },
  qtyContainer: { alignItems: 'flex-end' },
  qtyValue: { fontSize: 24, fontWeight: 'bold' },
  qtyLabel: { fontSize: 10, fontWeight: 'bold', color: '#999' },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 64,
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
  },
})
