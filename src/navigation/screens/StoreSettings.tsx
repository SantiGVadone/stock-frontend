import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export const StoreSettings = ({ nav }: any) => {
  const navigation = useNavigation()

  // Estados para los campos de la tienda
  const [storeName, setStoreName] = useState('Flagship Store')
  const [address, setAddress] = useState('123 Retail Ave, Suite 100')
  const [city, setCity] = useState('Metropolis')
  const [zipCode, setZipCode] = useState('90210')
  const [phone, setPhone] = useState('+1 (555) 123-4567')
  const [email, setEmail] = useState('support@flagship.retail')

  const SettingsCard = ({ icon, title, children }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name={icon} size={24} color='#0061D9' />
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={styles.divider} />
      {children}
    </View>
  )

  const CustomInput = ({
    label,
    icon,
    value,
    onChangeText,
    placeholder,
    halfWidth = false,
  }: any) => (
    <View style={[styles.inputGroup, halfWidth && { flex: 1 }]}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons name={icon} size={18} color='#666' style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor='#BBB'
        />
      </View>
    </View>
  )

  return (
    <SafeAreaProvider style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name='arrow-back-outline' size={28} color='#1A1A1A' />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Configuracion de la Tienda</Text>
        </View>
        <View style={{ width: 40 }}></View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* <Text style={styles.pageTitle}>Store Configuration</Text> */}

          {/* STORE IDENTITY */}
          <SettingsCard icon='business-outline' title='Store Identity'>
            <CustomInput
              label='Store Name'
              icon='create-outline'
              value={storeName}
              onChangeText={setStoreName}
            />
          </SettingsCard>

          {/* LOCATION DETAILS */}
          <SettingsCard icon='location-outline' title='Location Details'>
            <CustomInput
              label='Street Address'
              icon='map-outline'
              value={address}
              onChangeText={setAddress}
            />
            <View style={styles.row}>
              <CustomInput
                label='City'
                icon='location-outline'
                value={city}
                onChangeText={setCity}
                halfWidth
              />
              <CustomInput
                label='Zip Code'
                icon='navigate-outline'
                value={zipCode}
                onChangeText={setZipCode}
                halfWidth
              />
            </View>
          </SettingsCard>

          {/* CONTACT INFORMATION */}
          <SettingsCard icon='call-outline' title='Contact Information'>
            <CustomInput
              label='Phone Number'
              icon='call-outline'
              value={phone}
              onChangeText={setPhone}
            />
            <CustomInput
              label='Support Email'
              icon='mail-outline'
              value={email}
              onChangeText={setEmail}
            />
          </SettingsCard>
        </ScrollView>

        {/* BOTTOM ACTIONS */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.discardButton}>
            <Text style={styles.discardButtonText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Ionicons name='save-outline' size={20} color='#FFF' />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF9FE' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: '#FAF9FE',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#0061D9' },
  backButton: { padding: 4 },
  filterButton: { padding: 4 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginBottom: 16 },
  row: { flexDirection: 'row', gap: 12 },
  inputGroup: { marginBottom: 16 },
  inputLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6F8',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 52,
    paddingHorizontal: 16,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15, color: '#1A1A1A' },
  footer: {
    padding: 20,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  discardButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#F0F0F5',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  discardButtonText: { color: '#666', fontSize: 16, fontWeight: 'bold' },
  saveButton: {
    flex: 2,
    height: 56,
    backgroundColor: '#0061D9',
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
})
