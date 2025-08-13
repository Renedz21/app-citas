import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AppointmentWithDetails } from '@/types/entities';

import ClockIcon from '@/assets/icons/clock.svg';
import PhoneIcon from '@/assets/icons/phone.svg';
import { memo } from 'react';

interface ScheduleCardProps {
  appointment: AppointmentWithDetails;
}

const getStatusColor = (status: string | null) => {
  switch (status?.toLowerCase()) {
    case 'confirmed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'completed':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};

const getStatusLabel = (status: string | null) => {
  switch (status?.toLowerCase()) {
    case 'confirmed':
      return 'Confirmada';
    case 'pending':
      return 'Pendiente';
    case 'cancelled':
      return 'Cancelada';
    case 'completed':
      return 'Completada';
    default:
      return 'Pendiente';
  }
};

const getClientInitials = (firstName?: string | null, lastName?: string | null): string => {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  
  if (!first && !last) return 'U';
  if (!first) return last;
  if (!last) return first;
  
  return first + last;
};

const getClientName = (firstName?: string | null, lastName?: string | null): string => {
  const first = firstName?.trim() || '';
  const last = lastName?.trim() || '';
  
  if (!first && !last) return 'Usuario Sin Nombre';
  if (!first) return last;
  if (!last) return first;
  
  return `${first} ${last}`;
};

const getServiceName = (appointment: AppointmentWithDetails): string => {
  return appointment.professional_service?.custom_name || 
         appointment.professional_service?.service?.name || 
         'Servicio General';
};

const getClientPhone = (phone?: string | null): string => {
  return phone?.trim() || 'Sin teléfono';
};

const getDurationDisplay = (appointment: AppointmentWithDetails): string => {
  const duration = appointment.duration_minutes || 
                  appointment.professional_service?.custom_duration_minutes ||
                  appointment.professional_service?.service?.default_duration_minutes || 
                  60;
  return `${duration} min`;
};

export default memo(function ScheduleCard({ appointment }: ScheduleCardProps) {
  const router = useRouter();
  const handlePress = () => {
    router.push(`/(tabs)/appointments/${appointment.id}`);
  };

  const clientProfiles = appointment.client?.profiles;
  const firstName = clientProfiles?.first_name;
  const lastName = clientProfiles?.last_name;
  const phone = clientProfiles?.phone;

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
              {getClientInitials(firstName, lastName)}
            </Text>
          </View>
          <View>
            <Text className="text-slate-900 font-semibold text-base">
              {getClientName(firstName, lastName)}
            </Text>
            <Text className="text-slate-500 text-sm">
              {getServiceName(appointment)}
            </Text>
          </View>
        </View>
        <View
          className={`px-2 py-1 rounded-full border ${getStatusColor(
            appointment.status
          )}`}
        >
          <Text className="text-xs font-medium">
            {getStatusLabel(appointment.status)}
          </Text>
        </View>
      </View>

      {/* Details */}
      <View className="bg-slate-50 rounded-lg p-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <ClockIcon width={16} height={16} color="#64748B" />
            <Text className="ml-2 text-slate-600 text-sm font-medium">
              {appointment.appointment_date || 'Fecha no disponible'}
            </Text>
            <Text className="ml-2 text-slate-500 text-sm">
              ({getDurationDisplay(appointment)})
            </Text>
          </View>
          <View className="flex-row items-center">
            <PhoneIcon width={16} height={16} color="#64748B" />
            <Text className="ml-2 text-slate-600 text-sm">
              {getClientPhone(phone)}
            </Text>
          </View>
        </View>
        {/* Show appointment notes if available */}
        {appointment.notes && (
          <View className="mt-2 pt-2 border-t border-slate-200">
            <Text className="text-slate-600 text-sm">{appointment.notes}</Text>
          </View>
        )}
        {/* Show session notes if available */}
        {appointment.session_notes && appointment.session_notes.length > 0 &&
          appointment.session_notes.map((note) => (
            <View key={note.id} className="mt-2 pt-2 border-t border-slate-200">
              <Text className="text-slate-600 text-sm">{note.content}</Text>
            </View>
          ))}
      </View>
    </TouchableOpacity>
  );
});
