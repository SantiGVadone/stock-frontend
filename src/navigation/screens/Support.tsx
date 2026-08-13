import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export const Support = ({ nav }: any) => {
  const navigation = useNavigation<any>()
  const handleEmailSupport = () => {
    Linking.openURL('mailto:support_stockpro@vadonedev.com')
  }

  const handleVisitWeb = () => {
    Linking.openURL('https://vadonedev.com.ar')
  }

  const HelpCard = ({
    icon,
    title,
    description,
    onPress,
    actionIcon = 'arrow-forward',
  }: any) => (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View
        style={[
          styles.iconWrapper,
          title.includes('Email') && styles.iconWrapperAlt,
        ]}
      >
        <Ionicons
          name={icon}
          size={24}
          color={title.includes('Email') ? '#FFF' : '#0061D9'}
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <Ionicons name={actionIcon} size={20} color='#CCC' />
    </TouchableOpacity>
  )

  const FAQItem = ({ question, answer }: any) => (
    <TouchableOpacity style={styles.faqItem}>
      <View style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{question}</Text>
        <Ionicons name='chevron-down' size={20} color='#CCC' />
      </View>
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Soporte</Text>
        <View style={{ width: 40 }}></View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.introSection}>
          <Text style={styles.pageTitle}>¿Como podemos ayudarte?</Text>
          <Text style={styles.pageSubtitle}>
            Encuentre las respuestas a las preguntas mas comunes.O pongase en
            contacto con nuestro equipo de soporte.
          </Text>
        </View>

        {/* PRIMARY ACTIONS */}
        <HelpCard
          icon='globe-outline'
          title='Visite nuestro Sitio Web'
          description='Encuentre mas informacion sobre nosotros y nuestros servicios.'
          onPress={handleVisitWeb}
        />

        <HelpCard
          icon='mail-outline'
          title='Email de Soporte'
          description='Obtenga ayuda personalizada de nuestros expertos.'
          onPress={handleEmailSupport}
          actionIcon='open-outline'
        />

        {/* FAQ SECTION */}
        <View style={styles.faqSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.faqBadge}>
              <Ionicons name='help-circle-outline' size={24} color='#0061D9' />
            </View>
            <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
          </View>

          <View style={styles.faqList}>
            <FAQItem question='¿Como Agrego un Producto al Stock?' />
            <FAQItem question='¿Como Actualizo el Precio de un Producto?' />
            <FAQItem question='¿Como Agrego un empleado a mi Tienda?' />
          </View>
        </View>
      </ScrollView>
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
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#0061D9' },
  backButton: { padding: 4 },
  filterButton: { padding: 4 },
  scrollContent: { padding: 24 },
  introSection: { alignItems: 'center', marginBottom: 32 },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0061D9',
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconWrapperAlt: { backgroundColor: '#0061D9' },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    lineHeight: 20,
  },
  faqSection: {
    marginTop: 16,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  faqBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A' },
  faqList: { gap: 4 },
  faqItem: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    paddingRight: 16,
  },
})
