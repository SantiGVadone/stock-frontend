import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../context/AuthContext'
import { Store } from '../../utility/auth'

export default function Profile({ onClose }: any) {
  const navigation = useNavigation<any>()
  const { logout, user, storeId, stores, selectStore } = useAuth()

  const selectedStore = stores?.find((s) => s.id === storeId)
  const userRole = selectedStore?.rol ?? stores?.[0]?.rol ?? 'Usuario'

  const [showStoreSelector, setShowStoreSelector] = useState(false)
  // const storeSelectorRef = useRef<any>(null)

  const handleSelectStore = (store: Store) => {
    selectStore(store.id)
    setShowStoreSelector(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
      navigation.navigate('Login')
    } catch (e) {
      console.error('Hubi un error en el logout', e)
    }
  }

  const DrawerItem = ({ icon, label, onPress, color = '#1A1A1A' }: any) => (
    <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
      <View
        style={[
          styles.iconWrapper,
          { backgroundColor: color === '#E53935' ? '#FFF0F0' : '#F5F6F8' },
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={color === '#E53935' ? '#E53935' : '#0061D9'}
        />
      </View>
      <Text style={[styles.itemLabel, { color }]}>{label}</Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name='person' size={40} color='#0061D9' />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userRole}>{userRole.toUpperCase()}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Ionicons name='close' size={30} color='#666' />
        </TouchableOpacity>
      </View>

      <View style={styles.storeSelectorContainer}>
        <TouchableOpacity
          style={styles.storeSelector}
          onPress={() => setShowStoreSelector(!showStoreSelector)}
        >
          <View style={styles.storeInfo}>
            <Text style={styles.storeSelectorLabel}>TIENDA ACTUAL</Text>
            <Text style={styles.storeName}>
              {selectedStore?.name ?? 'Sin tienda seleccionada'}
            </Text>
          </View>
          <Ionicons
            name={showStoreSelector ? 'chevron-up' : 'chevron-down'}
            size={24}
            color='#0061D9'
          />
        </TouchableOpacity>

        <Modal
          visible={showStoreSelector}
          transparent
          animationType='slide' //podria ser fade tambien
          onRequestClose={() => setShowStoreSelector(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setShowStoreSelector(false)}
            activeOpacity={1}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Seleccionar una Tienda</Text>
              <FlatList
                data={stores ?? []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.modalItem,
                      storeId === item.id && styles.modalItemSelected,
                    ]}
                    onPress={() => handleSelectStore(item)}
                  >
                    <View style={styles.modalItemContent}>
                      <Ionicons
                        name='storefront-outline'
                        size={26}
                        color={storeId === item.id ? '#FFF' : '#0061D9'}
                        style={styles.modalIcon}
                      />
                      <View style={styles.modalItemText}>
                        <Text
                          style={[
                            styles.modalItemName,
                            storeId === item.id && styles.modalItemNameSelected,
                          ]}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={[
                            styles.modalItemRole,
                            storeId === item.id && styles.modalItemRoleSelected,
                          ]}
                        >
                          {item.rol?.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                    {storeId === item.id && (
                      <Ionicons
                        name='checkmark-circle-outline'
                        size={28}
                        color='#FFF'
                      />
                    )}
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.modalAddStore}
                onPress={() => {
                  setShowStoreSelector(false)
                  navigation.navigate('AddStore')
                }}
              >
                <Ionicons name='add-circle-outline' size={20} color='#FFF' />
                <Text style={styles.modalAddStoreText}>Crear Nueva Tienda</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>CUENTA</Text>
        <DrawerItem
          icon='person-outline'
          label='Mi Perfil'
          onPress={() => {
            console.log(
              'Aca tengo que redigir a una pantalla para poder ver todos los detalles del perfil: Nombre, Apellido, Email, Telefono, Creado el xxx.',
            )
          }}
        />
        <DrawerItem
          icon='notifications-outline'
          label='Notificaciones'
          onPress={() => {
            console.log(
              'Aca tengo que redirigir a una pantalla donde se pueda configurar si se quiere aceptar notificaciones o no',
            )
          }}
        />
        <DrawerItem
          icon='shield-checkmark-outline'
          label='Seguridad'
          onPress={() => {
            console.log(
              'aca voy a redirigir a una pantalla donde se pueda cambiar la contraseña o activar el tema de logearse con la huella, o cambiar los permisos a la camara y todo eso',
            )
          }}
        />

        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>SISTEMA</Text>
        <DrawerItem
          icon='settings-outline'
          label='Ajustes de Tienda'
          onPress={() => {
            console.log(
              'Aca quiero que se puedan cambiar los datos de la tienda, Nombre, Ubicacion, Telefono (Solo si el usuario es Jefe), sino ni deberia salirle esta opcion en el menu',
            )
          }}
        />
        <DrawerItem
          icon='people-outline'
          label='Gestionar Equipo'
          onPress={() => {
            console.log(
              'Aca deberia poder invitar a un empleado a unirse, no se si enviandole un codigo, un mail o algun QR o algo(esta Opcion tambien es solo si el usuario es de rol Jefe)',
            )
          }}
        />
        <DrawerItem
          icon='help-circle-outline'
          label='Ayuda y Soporte'
          onPress={() => {
            console.log(
              'Que envie a la pagina de la App o a un mail de soporte, nada mas',
            )
          }}
        />

        <View style={styles.divider} />

        <DrawerItem
          icon='log-out-outline'
          label='Cerrar Sesión'
          onPress={() => {
            handleLogout()
          }}
          color='#E53935'
        />
        {/*Aca tendria que tener un apartado de Renunciar a la tienda o algo asi */}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.version}>StockPro v2.4.0</Text>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  profileSection: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: { gap: 2 },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#1A1A1A' },
  userRole: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0061D9',
    letterSpacing: 1,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  content: { flex: 1, padding: 24, paddingTop: 15 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 16,
    letterSpacing: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemLabel: { fontSize: 16, fontWeight: '600' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 24 },
  footer: { padding: 24, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  version: {
    textAlign: 'center',
    color: '#CCC',
    fontSize: 12,
    fontWeight: 'bold',
  },
  storeSelectorContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  storeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    // borderWidth: 1,
    // borderColor: '#E0E0E0',
  },
  storeInfo: { flex: 1 },
  storeSelectorLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#999',
    letterSpacing: 1,
    marginBottom: 2,
  },
  storeName: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    paddingRight: 45,
    borderRadius: 12,
    backgroundColor: '#F5F6F8',
    marginBottom: 8,
  },
  modalItemSelected: { backgroundColor: '#0061D9' },
  modalItemContent: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  modalIcon: { marginRight: 4 },
  modalItemText: { flex: 1 },
  modalItemName: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  modalItemNameSelected: { color: '#FFF' },
  modalItemRole: { fontSize: 12, fontWeight: 'bold', color: '#666' },
  modalItemRoleSelected: { color: 'rgba(255,255,255,0.8)' },
  modalAddStore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    paddingVertical: 14,
    backgroundColor: '#0061D9',
    borderRadius: 12,
  },
  modalAddStoreText: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
})
