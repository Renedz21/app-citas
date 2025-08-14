import { View, Text, TouchableOpacity } from 'react-native';
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';

interface HeaderProps {
  onBack: () => void;
}

export const Header = ({ onBack }: HeaderProps) => (
  <View className="bg-white border-b border-slate-200 px-6 py-4">
    <View className="flex-row items-center">
      <TouchableOpacity onPress={onBack} className="p-2 -ml-2 mr-3">
        <ChevronLeftIcon width={24} height={24} />
      </TouchableOpacity>
      <Text className="text-slate-900 text-xl font-semibold">
        Actualizar a Premium
      </Text>
    </View>
  </View>
);
