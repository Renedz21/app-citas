import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  SlideInRight,
  BounceIn
} from 'react-native-reanimated';
import { UserType } from '../../../hooks/onboarding/use-onboarding';

interface UserTypeSelectionProps {
  onUserTypeSelect: (type: UserType) => void;
}

export const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({
  onUserTypeSelect
}) => {
  return (
    <View className="flex-1 px-6 py-8">
      <Animated.View
        entering={FadeIn.delay(200)}
        className="items-center mb-12"
      >
        <Animated.View
          entering={BounceIn.delay(400)}
          className="w-20 h-20 bg-indigo-100 rounded-full items-center justify-center mb-6"
        >
          <Feather name="users" size={32} color="#4F46E5" />
        </Animated.View>
        <Animated.Text
          entering={FadeIn.delay(600)}
          className="text-slate-900 text-3xl font-bold text-center mb-3"
        >
          ¡Bienvenido!
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.delay(800)}
          className="text-slate-600 text-center text-lg leading-6 max-w-sm"
        >
          Para personalizar tu experiencia, necesitamos conocer un poco más
          sobre ti
        </Animated.Text>
      </Animated.View>

      <View className="gap-y-4 mb-8">
        <Animated.View entering={SlideInRight.delay(1000).springify()}>
          <TouchableOpacity
            className="bg-white rounded-xl border-2 border-slate-200 p-6"
            onPress={() => onUserTypeSelect('professional')}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mr-4">
                <Feather name="briefcase" size={24} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-900 font-bold text-lg mb-1">
                  Soy un Profesional Independiente
                </Text>
                <Text className="text-slate-600 text-sm">
                  Ofrezco servicios profesionales en mi área de especialidad
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#94A3B8" />
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={SlideInRight.delay(1200).springify()}>
          <TouchableOpacity
            className="bg-white rounded-xl border-2 border-slate-200 p-6"
            onPress={() => onUserTypeSelect('client')}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mr-4">
                <Feather name="user" size={24} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-900 font-bold text-lg mb-1">
                  Soy un Cliente
                </Text>
                <Text className="text-slate-600 text-sm">
                  Busco servicios profesionales y quiero agendar citas
                </Text>
              </View>
              <Feather name="chevron-right" size={24} color="#94A3B8" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <Animated.Text
        entering={FadeIn.delay(1400)}
        className="text-slate-500 text-sm text-center"
      >
        Puedes cambiar esta configuración más tarde en tu perfil
      </Animated.Text>
    </View>
  );
};
