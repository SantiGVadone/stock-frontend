import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

/**
 * UserDrawer.tsx
 * Menú lateral de perfil del usuario
 */
export default function Profile({ onClose }: any) {
  // Datos simulados del usuario (pueden venir de un contexto de Auth)
  const user = {
    name: 'Santi Vadone',
    email: 'santiago@stockpro.com',
    role: 'Administrador',
    avatar: null, // Usaremos un icono por defecto
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name='person' size={40} color='#0061D9' />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userRole}>{user.role.toUpperCase()}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name='close' size={24} color='#666' />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>CUENTA</Text>
        <DrawerItem
          icon='person-outline'
          label='Mi Perfil'
          onPress={() => {}}
        />
        <DrawerItem
          icon='notifications-outline'
          label='Notificaciones'
          onPress={() => {}}
        />
        <DrawerItem
          icon='shield-checkmark-outline'
          label='Seguridad'
          onPress={() => {}}
        />

        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>SISTEMA</Text>
        <DrawerItem
          icon='settings-outline'
          label='Ajustes de Tienda'
          onPress={() => {}}
        />
        <DrawerItem
          icon='people-outline'
          label='Gestionar Equipo'
          onPress={() => {}}
        />
        <DrawerItem
          icon='help-circle-outline'
          label='Ayuda y Soporte'
          onPress={() => {}}
        />

        <View style={styles.divider} />

        <DrawerItem
          icon='log-out-outline'
          label='Cerrar Sesión'
          onPress={() => {}}
          color='#E53935'
        />
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.version}>StockPro v2.4.0</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
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
  userName: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
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
  },
  content: { flex: 1, padding: 24 },
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
})
