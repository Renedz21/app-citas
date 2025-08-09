import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { appointments } from '@/constants/dummy-data';
import { Appointment } from '@/types/dummy-data.type';
import ScheduleCard from '@/modules/core/components/shared/schedule-card';

const filters = [
  {
    label: 'Todas',
    count: appointments.length,
    color: 'bg-slate-100 text-slate-700'
  },
  { label: 'Confirmadas', count: 3, color: 'bg-green-100 text-green-700' },
  { label: 'Pendientes', count: 2, color: 'bg-amber-100 text-amber-700' },
  { label: 'Canceladas', count: 1, color: 'bg-red-100 text-red-700' }
];

const renderItem = ({ item }: { item: Appointment }) => (
  <ScheduleCard {...item} />
);

export default function Appointments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todas');

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-white border-b border-slate-200 px-6 py-4">
        <Text className="text-slate-900 text-xl font-semibold mb-4">
          Mis Citas
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-slate-50 rounded-xl px-4 py-3 mb-4">
          <Feather name="search" size={20} color="#64748B" />
          <TextInput
            className="flex-1 ml-3 text-slate-900"
            placeholder="Buscar por nombre, servicio..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Badges */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10
          }}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.label}
              className={`px-4 py-2 rounded-full border ${
                selectedFilter === filter.label
                  ? 'bg-indigo-100 text-indigo-700 border-indigo-200'
                  : 'border-gray-200'
              }`}
              onPress={() => setSelectedFilter(filter.label)}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedFilter === filter.label ? 'text-indigo-700' : ''
                }`}
              >
                {filter.label} ({filter.count})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 py-4">
        {/* Results Header */}
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-slate-600 text-sm">
            {appointments.length} citas encontradas
          </Text>
          <TouchableOpacity className="flex-row items-center">
            <Feather name="filter" size={16} color="#64748B" />
            <Text className="ml-1 text-slate-600 text-sm font-medium">
              Filtrar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Appointments List */}
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-indigo-600 p-4 rounded-full shadow-lg"
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
