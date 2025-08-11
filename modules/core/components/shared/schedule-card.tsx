import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AppointmentWithDetails } from '@/types';
import { memo } from 'react';
import { Badge } from '../ui/badge';

export default memo(function ScheduleCard(appointment: AppointmentWithDetails) {
  const router = useRouter();
  const {
    starts_at,
    duration_minutes,
    notes,
    status,
    id,
    client,
    user_service
  } = appointment;

  // Helper function to format date/time
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get service name (custom name or default name)
  const serviceName =
    user_service?.custom_name || user_service?.service?.name || 'Servicio';

  // Get client initials
  const clientInitials =
    client?.name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || '??';

  const handlePress = () => {
    // Navigate to the appointment details route using the appointment's id
    router.push(`/(tabs)/appointments/${id}`);
  };

  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-4 mb-3 border border-slate-200"
      activeOpacity={0.8}
      onPress={handlePress}
    >
      {/* Header with time and status */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center mr-3">
            <Text className="text-indigo-600 font-bold text-sm">
              {clientInitials}
            </Text>
          </View>
          <View>
            <Text className="text-slate-900 font-semibold text-base">
              {client?.name || 'Cliente'}
            </Text>
            <Text className="text-slate-500 text-sm">{serviceName}</Text>
          </View>
        </View>
        <Badge
          variant={
            status.toLowerCase() === 'confirmed'
              ? 'completed'
              : status.toLowerCase() === 'scheduled'
                ? 'pending'
                : status.toLowerCase() === 'cancelled'
                  ? 'cancelled'
                  : 'default'
          }
        >
          {status.toLowerCase() === 'confirmada'
            ? 'Completado'
            : status.toLowerCase() === 'pendiente'
              ? 'Pendiente'
              : status.toLowerCase() === 'cancelada'
                ? 'Cancelado'
                : 'Pendiente'}
        </Badge>
      </View>

      {/* Details */}
      <View className="bg-slate-50 rounded-lg p-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#64748B" />
            <Text className="ml-2 text-slate-600 text-sm font-medium">
              {formatDateTime(starts_at)}
            </Text>
            <Text className="ml-2 text-slate-500 text-sm">
              ({duration_minutes || user_service?.duration_minutes || 60} min)
            </Text>
          </View>
          <View className="flex-row items-center">
            <Feather name="phone" size={16} color="#64748B" />
            <Text className="ml-2 text-slate-600 text-sm">
              {client?.phone || 'Sin teléfono'}
            </Text>
          </View>
        </View>
        {notes && (
          <View className="mt-2 pt-2 border-t border-slate-200">
            <Text className="text-slate-600 text-sm">{notes}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});
//export default function ScheduleCard(appointment: AppointmentWithDetails) {
