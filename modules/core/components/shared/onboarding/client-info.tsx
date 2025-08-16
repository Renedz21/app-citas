import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { GENDER_OPTIONS } from './constants';

interface ClientInfoProps {
  onComplete: () => void;
  onBack: () => void;
}

export const ClientInfo: React.FC<ClientInfoProps> = ({
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
          className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4"
        >
          <Feather name="user" size={24} color="#10B981" />
        </Animated.View>
        <Animated.Text
          entering={FadeIn.delay(500)}
          className="text-slate-900 text-2xl font-bold text-center mb-2"
        >
          Información del Cliente
        </Animated.Text>
        <Animated.Text
          entering={FadeIn.delay(700)}
          className="text-slate-600 text-center"
        >
          Ayúdanos a brindarte la mejor experiencia personalizada
        </Animated.Text>
      </Animated.View>

      <View className="gap-y-6">
        {/* First Name */}
        <FormField
          name="clientData.first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: Juan"
                  value={field.value || ''}
                  onChangeText={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          name="clientData.last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: Pérez"
                  value={field.value || ''}
                  onChangeText={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          name="clientData.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email *</FormLabel>
              <FormControl>
                <Input
                  placeholder="ejemplo@correo.com"
                  value={field.value || ''}
                  onChangeText={field.onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone */}
        <FormField
          name="clientData.phone"
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

        {/* Age */}
        <FormField
          name="clientData.age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edad *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: 25"
                  value={field.value ? field.value.toString() : ''}
                  onChangeText={(text) => {
                    const age = parseInt(text, 10);
                    field.onChange(isNaN(age) ? 0 : age);
                  }}
                  keyboardType="numeric"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          name="clientData.gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Género *</FormLabel>
              <FormControl>
                <View className="flex-row flex-wrap gap-2">
                  {GENDER_OPTIONS.map((gender) => (
                    <TouchableOpacity
                      key={gender}
                      className={`px-4 py-2 rounded-full border ${
                        field.value === gender
                          ? 'bg-green-100 border-green-500'
                          : 'bg-white border-slate-300'
                      }`}
                      onPress={() => field.onChange(gender)}
                    >
                      <Text
                        className={`text-sm font-medium ${
                          field.value === gender
                            ? 'text-green-700'
                            : 'text-slate-700'
                        }`}
                      >
                        {gender}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </View>

      <Animated.View entering={FadeIn.delay(1500)}>
        <Button
          title="Completar Perfil de Cliente"
          onPress={onComplete}
          className="mt-8 mb-4"
          variant={'secondary'}
        />

        <TouchableOpacity className="py-3" onPress={onBack}>
          <Text className="text-center text-slate-600 font-medium">Volver</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};
