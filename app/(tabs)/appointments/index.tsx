import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import ScheduleCard from '@/modules/core/components/shared/schedule-card';

import SearchIcon from '@/assets/icons/search.svg';
import FilterIcon from '@/assets/icons/filter.svg';
import CloseCircleIcon from '@/assets/icons/circle-x.svg';
import { APPOINTMENT_STATUSES, AppointmentWithDetails } from '@/types/entities';
import { useGetAppointments } from '@/modules/core/hooks/appointments/use-appointments';
import { FlashList } from '@shopify/flash-list';
import { FilterBadges } from '@/modules/core/components/shared/appointments/filter-badges';

const STATUS_MAP = {
  Confirmadas: APPOINTMENT_STATUSES[0],
  Pendientes: APPOINTMENT_STATUSES[1],
  Canceladas: APPOINTMENT_STATUSES[2]
};

export default function Appointments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todas');
  const {
    data: appointments,
    isLoading,
    refetch,
    isFetching
  } = useGetAppointments({
    status: [APPOINTMENT_STATUSES[1], APPOINTMENT_STATUSES[0]]
  });

  const filters = useMemo(() => {
    if (!appointments) return [];

    const counts = appointments.reduce(
      (acc, appointment) => {
        const status = appointment.status;
        if (status === APPOINTMENT_STATUSES[0]) acc.confirmed++;
        else if (status === APPOINTMENT_STATUSES[1]) acc.pending++;
        else if (status === APPOINTMENT_STATUSES[2]) acc.cancelled++;
        acc.total++;
        return acc;
      },
      { total: 0, confirmed: 0, pending: 0, cancelled: 0 }
    );

    return [
      {
        label: 'Todas',
        count: counts.total,
        color: 'bg-slate-100 text-slate-700'
      },
      {
        label: 'Confirmadas',
        count: counts.confirmed,
        color: 'bg-green-100 text-green-700'
      },
      {
        label: 'Pendientes',
        count: counts.pending,
        color: 'bg-amber-100 text-amber-700'
      },
      {
        label: 'Canceladas',
        count: counts.cancelled,
        color: 'bg-red-100 text-red-700'
      }
    ];
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];

    let filtered = appointments;

    // Filtrar por estado
    if (selectedFilter !== 'Todas') {
      const targetStatus =
        STATUS_MAP[selectedFilter as keyof typeof STATUS_MAP];
      if (targetStatus) {
        filtered = filtered.filter(
          (appointment) => appointment.status === targetStatus
        );
      }
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((appointment) => {
        const clientName =
          `${appointment.client.profiles.first_name} ${appointment.client.profiles.last_name}`.toLowerCase();
        const serviceName =
          appointment.professional_service.service.name.toLowerCase();
        return clientName.includes(query) || serviceName.includes(query);
      });
    }

    return filtered;
  }, [appointments, searchQuery, selectedFilter]);

  const renderItem = useCallback(
    ({ item }: { item: AppointmentWithDetails }) => (
      <ScheduleCard appointment={item} />
    ),
    []
  );

  const keyExtractor = useCallback(
    (item: Pick<AppointmentWithDetails, 'id'>) => item.id,
    []
  );

  const clearFilters = () => {
    setSelectedFilter('Todas');
    setSearchQuery('');
  };

  const hasFilters = selectedFilter !== 'Todas' || searchQuery.trim() !== '';

  if (appointments?.length === 0) return <Text>No hay citas</Text>;
  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-white border-b border-slate-200 px-6 py-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-slate-900 text-xl font-semibold mb-4">
            Mis Citas
          </Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-slate-50 rounded-xl px-4 py-3 mb-4">
          <SearchIcon width={20} height={20} color="#64748B" />
          <TextInput
            className="flex-1 ml-3 text-slate-900"
            placeholder="Buscar por nombre, servicio..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <CloseCircleIcon width={20} height={20} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Badges */}
        <FilterBadges
          filters={filters}
          selectedFilter={selectedFilter}
          onFilterSelect={setSelectedFilter}
        />
      </View>

      {/* Content */}
      <View className="flex-1 px-6 py-4">
        {/* Results Header */}

        {/* Appointments List */}
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlashList
            data={filteredAppointments}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            estimatedItemSize={100}
            refreshControl={
              <RefreshControl
                refreshing={isLoading || isFetching}
                onRefresh={refetch}
              />
            }
            ListEmptyComponent={<Text>No hay citas</Text>}
            ListHeaderComponent={() => (
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-slate-600 text-sm">
                  {filteredAppointments.length} citas encontradas
                  {selectedFilter !== 'Todas' && ` (${selectedFilter})`}
                  {searchQuery.trim() !== '' && ` - "${searchQuery}"`}
                </Text>
                <View className="flex-row items-center gap-2">
                  {hasFilters && (
                    <TouchableOpacity
                      className="flex-row items-center px-3 py-1 bg-slate-100 rounded-full"
                      onPress={clearFilters}
                    >
                      <CloseCircleIcon width={14} height={14} color="#64748B" />
                      <Text className="ml-1 text-slate-600 text-xs font-medium">
                        Limpiar
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity className="flex-row items-center">
                    <FilterIcon width={16} height={16} color="#64748B" />
                    <Text className="ml-1 text-slate-600 text-sm font-medium">
                      Filtrar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}
