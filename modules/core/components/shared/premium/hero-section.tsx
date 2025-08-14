import { View, Text } from 'react-native';
import StarIcon from '@/assets/icons/star.svg';

export const HeroSection = () => (
  <View className="bg-indigo-600 px-6 py-8">
    <View className="items-center">
      <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center mb-4">
        <StarIcon width={24} height={24} color="white" />
      </View>
      <Text className="text-white text-2xl font-bold text-center mb-2">
        Actualizar a Premium
      </Text>
      <Text className="text-white/90 text-center text-base leading-6 max-w-sm">
        Desbloquea características avanzadas para crecer tu práctica
      </Text>
    </View>
  </View>
);
