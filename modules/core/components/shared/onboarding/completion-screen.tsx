import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  SlideInRight,
  AnimatedStyle
} from 'react-native-reanimated';
import { UserType } from '../../../hooks/onboarding/use-onboarding';

interface CompletionScreenProps {
  userType: UserType;
  celebrationStyle: AnimatedStyle;
  onStart: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  userType,
  celebrationStyle,
  onStart
}) => {
  return (
    <View className="flex-1 justify-center items-center px-6">
      <Animated.View className="items-center max-w-sm">
        <Animated.View
          style={celebrationStyle}
          className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-6"
        >
          <Feather name="check-circle" size={32} color="#10B981" />
        </Animated.View>
        <Animated.Text
          entering={FadeIn.delay(200)}
          className="text-slate-900 text-3xl font-bold text-center mb-3"
        >
          ¡Perfil Completado!
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.delay(400)}
          className="text-slate-600 text-center text-lg leading-6 mb-8"
        >
          {userType === 'professional'
            ? 'Tu perfil profesional está listo. Ahora puedes comenzar a gestionar tus servicios y citas.'
            : 'Tu perfil de cliente está listo. Ahora puedes buscar profesionales y agendar servicios.'}
        </Animated.Text>

        <Animated.View
          entering={SlideInRight.delay(600).springify()}
          className="w-full"
        >
          <TouchableOpacity
            className="bg-indigo-600 py-4 px-8 rounded-xl"
            onPress={onStart}
            activeOpacity={0.8}
          >
            <Text className="text-center text-white font-bold text-lg">
              Comenzar
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </View>
  );
};
