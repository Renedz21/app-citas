import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { AppointmentWithDetails } from '@/types';
import ScheduleCard from '@/modules/core/components/shared/schedule-card';
import { useGetAppointments } from '@/modules/core/hooks/appointments/use-appointments';
import { FlashList } from '@shopify/flash-list';

const renderItem = ({ item }: { item: AppointmentWithDetails }) => (
  <ScheduleCard {...item} />
);

export default function Appointments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todas');

  const {
    data: appointments,
    isLoading,
    isError,
    refetch,
    isRefetching,
    isFetching
  } = useGetAppointments();

  if (isLoading) {
    return (
      <View className="flex-1 bg-slate-50 justify-center items-center">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-slate-50 justify-center items-center">
        <Text className="text-red-600">Error al cargar citas</Text>
      </View>
    );
  }

  // Create dynamic filters based on actual data
  const appointmentsList = appointments || [];
  const filters = [
    {
      label: 'Todas',
      count: appointmentsList.length,
      color: 'bg-slate-100 text-slate-700'
    },
    {
      label: 'Programadas',
      count: appointmentsList.filter((a) => a.status === 'scheduled').length,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      label: 'Completadas',
      count: appointmentsList.filter((a) => a.status === 'completed').length,
      color: 'bg-green-100 text-green-700'
    },
    {
      label: 'Canceladas',
      count: appointmentsList.filter((a) => a.status === 'cancelled').length,
      color: 'bg-red-100 text-red-700'
    }
  ];

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
            {appointmentsList.length} citas encontradas
          </Text>
          <TouchableOpacity className="flex-row items-center">
            <Feather name="filter" size={16} color="#64748B" />
            <Text className="ml-1 text-slate-600 text-sm font-medium">
              Filtrar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Appointments List */}
        <FlashList
          data={appointmentsList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={100}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-20">
              <Ionicons name="calendar-outline" size={64} color="#CBD5E1" />
              <Text className="text-slate-500 text-lg font-medium mt-4">
                No tienes citas programadas
              </Text>
              <Text className="text-slate-400 text-sm mt-2">
                Toca el botón + para crear tu primera cita
              </Text>
            </View>
          }
          onRefresh={() => {
            refetch();
          }}
          refreshing={isRefetching || isFetching}
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
