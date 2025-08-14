import { Text, TouchableOpacity } from 'react-native';

export const ActionButtons = () => (
  <>
    <TouchableOpacity
      className="bg-blue-600 py-4 rounded-lg shadow-sm mb-4"
      activeOpacity={0.9}
    >
      <Text className="text-center text-white font-semibold text-base">
        Actualizar a Premium
      </Text>
    </TouchableOpacity>
    <TouchableOpacity className="flex-row items-center justify-center py-3">
      <Text className="text-slate-600 text-sm mr-2">💬</Text>
      <Text className="text-slate-600 text-sm">Contactar ventas</Text>
    </TouchableOpacity>
  </>
);
