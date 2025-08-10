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
import { useRouter } from 'expo-router';
import { clients } from '@/constants/dummy-data';
import { Client } from '@/types/dummy-data.type';

export default function ClientsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const router = useRouter();

  const filters = [
    {
      label: 'Todos',
      count: clients.length,
      color: 'bg-slate-100 text-slate-700'
    },
    {
      label: 'Activos',
      count: clients.filter((c) => c.status === 'Activo').length,
      color: 'bg-green-100 text-green-700'
    },
    {
      label: 'Nuevos',
      count: clients.filter((c) => c.status === 'Nuevo').length,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      label: 'Inactivos',
      count: clients.filter((c) => c.status === 'Inactivo').length,
      color: 'bg-red-100 text-red-700'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'activo':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'nuevo':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'inactivo':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const renderItem = ({ item }: { item: Client }) => (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-3 border border-slate-200"
      activeOpacity={0.8}
      onPress={() => router.push(`/clients/${item.id}`)}
    >
      {/* Header with name and status */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center mr-3">
            <Text className="text-indigo-600 font-bold text-sm">
              {item.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </Text>
          </View>
          <View>
            <Text className="text-slate-900 font-semibold text-base">
              {item.name}
            </Text>
            <Text className="text-slate-500 text-sm">
              {item.age} años • {item.gender}
            </Text>
          </View>
        </View>
        <View
          className={`px-2 py-1 rounded-full border ${getStatusColor(item.status)}`}
        >
          <Text className="text-xs font-medium">{item.status}</Text>
        </View>
      </View>

      {/* Client Info */}
      <View className="bg-slate-50 rounded-lg p-3">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            <Feather name="calendar" size={16} color="#64748B" />
            <Text className="ml-2 text-slate-600 text-sm">
              Última visita: {formatDate(item.lastVisit)}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Feather name="activity" size={16} color="#64748B" />
            <Text className="ml-2 text-slate-600 text-sm">
              {item.totalSessions} sesiones
            </Text>
          </View>
        </View>

        {item.nextAppointment && (
          <View className="flex-row items-center mb-2">
            <Ionicons name="time-outline" size={16} color="#10B981" />
            <Text className="ml-2 text-emerald-600 text-sm font-medium">
              Próxima cita: {formatDate(item.nextAppointment)}
            </Text>
          </View>
        )}

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Feather name="phone" size={16} color="#64748B" />
            <Text className="ml-2 text-slate-600 text-sm">{item.phone}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center">
            <Feather name="mail" size={16} color="#64748B" />
            <Text className="ml-1 text-slate-600 text-sm">Email</Text>
          </TouchableOpacity>
        </View>

        {item.diagnosis && (
          <View className="mt-2 pt-2 border-t border-slate-200">
            <Text className="text-slate-600 text-sm">
              <Text className="font-medium">Diagnóstico:</Text> {item.diagnosis}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-white border-b border-slate-200 px-6 py-4">
        <Text className="text-slate-900 text-xl font-semibold mb-4">
          Mis Clientes
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-slate-50 rounded-xl px-4 py-3 mb-4">
          <Feather name="search" size={20} color="#64748B" />
          <TextInput
            className="flex-1 ml-3 text-slate-900"
            placeholder="Buscar por nombre, diagnóstico..."
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
            {clients.length} clientes registrados
          </Text>
          <TouchableOpacity className="flex-row items-center">
            <Feather name="filter" size={16} color="#64748B" />
            <Text className="ml-1 text-slate-600 text-sm font-medium">
              Filtrar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Clients List */}
        <FlatList
          data={clients}
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
        <Ionicons name="person-add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
