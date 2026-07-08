import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default function Filters({ onClose, onApply }: any) {
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [stockStatus, setStockStatus] = useState('Todos')

  const categories = [
    'Todas',
    'Bebidas',
    'Alimentos',
    'Limpieza',
    'Electrónica',
    'Otros',
  ]
  const statuses = ['Todos', 'En Stock', 'Bajo Stock', 'Sin Stock']

  const FilterChip = ({ label, isSelected, onPress }: any) => (
    <TouchableOpacity
      style={[styles.chip, isSelected && styles.chipSelected]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filtros</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name='close' size={24} color='#1A1A1A' />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>CATEGORÍAS</Text>
          <View style={styles.chipsContainer}>
            {categories.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                isSelected={selectedCategory === cat}
                onPress={() => setSelectedCategory(cat)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ESTADO DE STOCK</Text>
          <View style={styles.chipsContainer}>
            {statuses.map((status) => (
              <FilterChip
                key={status}
                label={status}
                isSelected={stockStatus === status}
                onPress={() => setStockStatus(status)}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ORDENAR POR</Text>
          <TouchableOpacity style={styles.sortItem}>
            <Text style={styles.sortText}>Nombre (A-Z)</Text>
            <Ionicons name='chevron-down' size={20} color='#666' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortItem}>
            <Text style={styles.sortText}>Cantidad (Mayor a Menor)</Text>
            <Ionicons name='chevron-down' size={20} color='#666' />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => {
            setSelectedCategory('Todas')
            setStockStatus('Todos')
          }}
        >
          <Text style={styles.resetButtonText}>Limpiar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => onApply({ selectedCategory, stockStatus })}
        >
          <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  content: { flex: 1, padding: 24 },
  section: { marginBottom: 32 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 16,
    letterSpacing: 1,
  },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F6F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chipSelected: { backgroundColor: '#0061D9', borderColor: '#0061D9' },
  chipText: { fontSize: 14, color: '#666', fontWeight: '600' },
  chipTextSelected: { color: '#FFF' },
  sortItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAF9FE',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  sortText: { fontSize: 15, color: '#1A1A1A', fontWeight: '500' },
  footer: {
    padding: 24,
    flexDirection: 'row',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  resetButton: {
    flex: 1,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  resetButtonText: { color: '#666', fontSize: 16, fontWeight: 'bold' },
  applyButton: {
    flex: 2,
    height: 56,
    backgroundColor: '#0061D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  applyButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
})
