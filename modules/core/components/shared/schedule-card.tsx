import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Appointment } from '@/types/dummy-data.type';

import ClockIcon from '@/assets/icons/clock.svg';
import PhoneIcon from '@/assets/icons/phone.svg';

export default function ScheduleCard(appointment: Appointment) {
  const { time, duration, name, service, phone, notes, status, id } =
    appointment;
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmada':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pendiente':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'cancelada':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

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
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </Text>
          </View>
          <View>
            <Text className="text-slate-900 font-semibold text-base">
              {name}
            </Text>
            <Text className="text-slate-500 text-sm">{service}</Text>
          </View>
        </View>
        <View
          className={`px-2 py-1 rounded-full border ${getStatusColor(status)}`}
        >
          <Text className="text-xs font-medium">{status}</Text>
        </View>
      </View>

      {/* Details */}
      <View className="bg-slate-50 rounded-lg p-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <ClockIcon width={16} height={16} color="#64748B" />
            <Text className="ml-2 text-slate-600 text-sm font-medium">
              {time}
            </Text>
            <Text className="ml-2 text-slate-500 text-sm">({duration})</Text>
          </View>
          <View className="flex-row items-center">
            <PhoneIcon width={16} height={16} color="#64748B" />
            <Text className="ml-2 text-slate-600 text-sm">{phone}</Text>
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
}
