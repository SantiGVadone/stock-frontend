import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

export const PickStore = () => {
  const navigation = useNavigation<any>()
  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Seleccione una</Text>
        <Text
          style={[
            styles.headerTitle,
            { color: '#0061D9', fontSize: 30, paddingHorizontal: 10 },
          ]}
        >
          Tienda
        </Text>
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            /* Aca tengo que setear el header x-store-id */
          }}
        >
          <View style={styles.productCard}>
            <View
              style={[
                styles.productIcon,
                {
                  backgroundColor: '#F0F4FF',
                },
              ]}
            >
              <Ionicons name={'beaker-outline'} size={24} color={'#0061D9'} />
            </View>
            <View style={styles.productInfo}>
              <Text
                style={styles.productName}
                numberOfLines={1}
                ellipsizeMode='tail'
              >
                {'Nombre'}
              </Text>
              <Text
                style={styles.productDesc}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {'Description'}
              </Text>
            </View>
            <View style={styles.qtyContainer}>
              <Text
                style={[
                  styles.qtyValue,
                  {
                    color: '#0061D9',
                  },
                ]}
              >
                {'Quantity'}
              </Text>
              <Text style={styles.qtyLabel}>{'CANT.'}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          navigation.navigate('Stock')
        }}
      >
        <Text style={styles.loginButtonText}>Ir al Stock</Text>
      </TouchableOpacity>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9FE',
    paddingTop: 35,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    alignSelf: 'center',
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
