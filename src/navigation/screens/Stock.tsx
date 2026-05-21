import { useNavigation } from '@react-navigation/native'
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import { useStock } from '../../hooks/useStock'
import AntDesign from '@expo/vector-icons/AntDesign'
import COLORS from '../../constants/colors'
import { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import EvilIcons from '@expo/vector-icons/EvilIcons'

export function Stock() {
  const navigation = useNavigation<any>() //aca en ves del any tendria que ir un <NativeStackNavigationProp<RootStackParamList>> donde el RootStackParamList seria un type creado e importado con los datos que va a recibir la pantalla profile
  const { stock, loading, removeProduct, refresh } = useStock()
  const [search, setSearch] = useState('')

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
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <StatusBar style='dark' />
        <View style={styles.searchContainer}>
          <EvilIcons name='search' size={38} color='black' />
          <TextInput
            style={styles.inputSearch} //forma del input
            placeholder='Buscar producto...'
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <View style={styles.list}>
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
                  <View style={styles.cards}>
                    <View style={styles.nameNquantity}>
                      <Text
                        style={styles.cardTitle}
                        numberOfLines={1} //hace que el texto no ocupe mas de una linea
                        ellipsizeMode='tail'
                      >
                        {item.name}
                      </Text>
                      <Text style={styles.cardQuantity}>
                        Cant: {item.quantity}
                      </Text>
                    </View>
                    <Text
                      style={styles.cardDescription}
                      numberOfLines={1}
                      ellipsizeMode='tail'
                    >
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            )}
          />
        </View>

        <View style={styles.containerAddButton}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.addButton}
            onPress={() => {
              navigation.navigate('AddProduct')
            }}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  searchContainer: {
    marginTop: 5,
    top: 0,
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: COLORS.softGray,
    elevation: 3,
  },
  inputSearch: {
    textAlign: 'left',
    fontSize: 20,
    maxWidth: '80%',
    overflow: 'scroll',
    minWidth: '80%',
  },
  container: {
    flex: 1,

    width: '100%',
    backgroundColor: COLORS.bg,
    alignItems: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  cards: {
    backgroundColor: 'white',
    padding: 16,
    margin: 4,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderColor: COLORS.darkBlue,
    elevation: 3,
  },
  nameNquantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.oscuro,
    marginRight: 12,
  },
  cardQuantity: {
    color: '#4b5563',
    fontWeight: 200,
  },
  cardDescription: {
    color: COLORS.gray,
    marginTop: 4,
    fontSize: 14,
    fontWeight: 400,
  },
  containerAddButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 9999999,
  },
  addButton: {
    backgroundColor: COLORS.blue,
    borderRadius: 99999,
    elevation: 3,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 48,
    marginVertical: 0,
    marginHorizontal: 20,
  },
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
})
