import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  SlideInRight,
  ZoomIn
} from 'react-native-reanimated';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { PROFESSIONS } from './constants';

interface ProfessionalInfoProps {
  onComplete: () => void;
  onBack: () => void;
}

export const ProfessionalInfo: React.FC<ProfessionalInfoProps> = ({
  onComplete,
  onBack
}) => {
  return (
    <ScrollView
      className="flex-1 px-6 py-8"
      showsVerticalScrollIndicator={false}
    >
      <Animated.View entering={FadeIn.delay(100)} className="items-center mb-8">
        <Animated.View
          entering={ZoomIn.delay(300)}
          className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4"
        >
          <Feather name="briefcase" size={24} color="#3B82F6" />
        </Animated.View>
        <Animated.Text
          entering={FadeIn.delay(500)}
          className="text-slate-900 text-2xl font-bold text-center mb-2"
        >
          Información Profesional
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.delay(700)}
          className="text-slate-600 text-center"
        >
          Completa tu perfil profesional para ofrecer mejor atención
        </Animated.Text>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(900)} className="gap-y-6">
        {/* Profession Field */}
        <Animated.View entering={SlideInRight.delay(1100).springify()}>
          <FormField
            name="professionalData.profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profesión *</FormLabel>
                <FormControl>
                  <View className="flex-row flex-wrap gap-2">
                    {PROFESSIONS.map((profession, index) => (
                      <Animated.View
                        key={profession}
                        entering={FadeIn.delay(1300 + index * 50)}
                      >
                        <TouchableOpacity
                          className={`px-4 py-2 rounded-full border ${
                            field.value === profession
                              ? 'bg-blue-100 border-blue-500'
                              : 'bg-white border-slate-300'
                          }`}
                          onPress={() => field.onChange(profession)}
                        >
                          <Text
                            className={`text-sm font-medium ${
                              field.value === profession
                                ? 'text-blue-700'
                                : 'text-slate-700'
                            }`}
                          >
                            {profession}
                          </Text>
                        </TouchableOpacity>
                      </Animated.View>
                    ))}
                  </View>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Animated.View>

        {/* Business Name Field */}
        <Animated.View entering={SlideInRight.delay(1600).springify()}>
          <FormField
            name="professionalData.business_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Negocio/Marca Personal *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: Estudio Creativo, Salón Bella, etc."
                    value={field.value || ''}
                    onChangeText={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Animated.View>

        {/* Phone Field */}
        <View>
          <FormField
            name="professionalData.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: +1234567890"
                    value={field.value || ''}
                    onChangeText={field.onChange}
                    keyboardType="phone-pad"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(2000)}>
        <Button
          title="Completar Perfil Profesional"
          onPress={onComplete}
          className="mt-8 mb-4"
          icon={<Feather name="arrow-right" size={24} color="#fff" />}
          iconPosition="right"
          variant={'secondary'}
        />

        <TouchableOpacity className="py-3" onPress={onBack}>
          <Text className="text-center text-slate-600 font-medium">Volver</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};
