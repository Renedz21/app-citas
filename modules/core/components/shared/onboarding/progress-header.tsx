import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeIn, AnimatedStyle } from 'react-native-reanimated';

interface ProgressHeaderProps {
  stepProgress: number;
  animatedProgressStyle: AnimatedStyle;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  stepProgress,
  animatedProgressStyle
}) => {
  return (
    <Animated.View
      entering={FadeIn}
      className="bg-white border-b border-slate-200 px-6 py-4"
    >
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-slate-900 text-xl font-semibold">
          Configuración Inicial
        </Text>
        <Text className="text-slate-500 text-sm">{stepProgress}/3</Text>
      </View>

      {/* Progress Bar */}
      <View className="flex-row gap-2">
        <View className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <Animated.View
            style={animatedProgressStyle}
            className="h-full bg-indigo-600 rounded-full"
          />
        </View>
      </View>
    </Animated.View>
  );
};
