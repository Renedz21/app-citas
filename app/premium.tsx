import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const features = [
  {
    icon: 'bar-chart-2',
    title: 'Análisis Avanzados',
    description:
      'Reportes detallados de tu práctica con métricas profesionales',
    color: '#3B82F6'
  },
  {
    icon: 'calendar',
    title: 'Calendario Ilimitado',
    description: 'Programa citas sin límites y gestiona múltiples horarios',
    color: '#10B981'
  },
  {
    icon: 'users',
    title: 'Clientes Ilimitados',
    description: 'Gestiona tantos pacientes como necesites sin restricciones',
    color: '#8B5CF6'
  },
  {
    icon: 'file-text',
    title: 'Notas Clínicas Avanzadas',
    description: 'Plantillas personalizadas y historial clínico completo',
    color: '#F59E0B'
  },
  {
    icon: 'shield',
    title: 'Backup Automático',
    description: 'Respaldo seguro en la nube de toda tu información',
    color: '#EF4444'
  },
  {
    icon: 'zap',
    title: 'Automatización',
    description: 'Recordatorios automáticos y flujos de trabajo optimizados',
    color: '#06B6D4'
  },
  {
    icon: 'phone',
    title: 'Soporte Prioritario',
    description: 'Atención personalizada 24/7 para resolver cualquier duda',
    color: '#84CC16'
  },
  {
    icon: 'download',
    title: 'Exportación de Datos',
    description: 'Exporta reportes en PDF y Excel para análisis externos',
    color: '#F97316'
  }
];

const plans = [
  {
    id: 'monthly',
    name: 'Mensual',
    price: '$29',
    period: '/mes',
    description: 'Ideal para empezar',
    savings: null
  },
  {
    id: 'yearly',
    name: 'Anual',
    price: '$25',
    period: '/mes',
    description: 'Más popular',
    savings: 'Ahorra $48 al año',
    originalPrice: '$29'
  }
];
//<View className="bg-gradient-to-br from-indigo-600 to-purple-700 px-6 py-12">

export default function PremiumScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-white border-b border-slate-200 px-6 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 -ml-2 mr-3"
          >
            <Feather name="arrow-left" size={24} color="#64748B" />
          </TouchableOpacity>
          <Text className="text-slate-900 text-xl font-semibold">
            Upgrade Premium
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View className="bg-indigo-600 px-6 py-12">
          <View className="items-center">
            <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-6">
              <Feather name="star" size={32} color="white" />
            </View>
            <Text className="text-white text-3xl font-bold text-center mb-3">
              Lleva tu práctica
            </Text>
            <Text className="text-white text-3xl font-bold text-center mb-4">
              al siguiente nivel
            </Text>
            <Text className="text-white/90 text-center text-lg leading-6 max-w-sm">
              Desbloquea herramientas profesionales diseñadas para hacer crecer
              tu consulta
            </Text>
          </View>
        </View>

        {/* Features Section */}
        <View className="px-6 py-8">
          <Text className="text-slate-900 text-2xl font-bold text-center mb-2">
            Características Premium
          </Text>
          <Text className="text-slate-600 text-center mb-8">
            Todo lo que necesitas para una práctica exitosa
          </Text>

          <View className="gap-y-4">
            {features.map((feature, index) => (
              <View
                key={index}
                className="bg-white rounded-xl border border-slate-200 p-4"
              >
                <View className="flex-row items-start">
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center mr-4"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <Feather
                      name={feature.icon as any}
                      size={20}
                      color={feature.color}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-slate-900 font-semibold text-base mb-1">
                      {feature.title}
                    </Text>
                    <Text className="text-slate-600 text-sm leading-5">
                      {feature.description}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Pricing Section */}
        <View className="px-6 pb-8">
          <Text className="text-slate-900 text-2xl font-bold text-center mb-2">
            Elige tu plan
          </Text>
          <Text className="text-slate-600 text-center mb-8">
            Cancela en cualquier momento
          </Text>

          <View className="gap-y-4 mb-8">
            {plans.map((plan) => (
              <TouchableOpacity
                key={plan.id}
                className={`rounded-xl border-2 p-6 ${
                  selectedPlan === plan.id
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200 bg-white'
                }`}
                onPress={() => setSelectedPlan(plan.id)}
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View>
                    <Text
                      className={`font-bold text-lg ${
                        selectedPlan === plan.id
                          ? 'text-indigo-900'
                          : 'text-slate-900'
                      }`}
                    >
                      {plan.name}
                    </Text>
                    <Text
                      className={`text-sm ${
                        selectedPlan === plan.id
                          ? 'text-indigo-600'
                          : 'text-slate-600'
                      }`}
                    >
                      {plan.description}
                    </Text>
                  </View>
                  <View className="items-end">
                    <View className="flex-row items-baseline">
                      {plan.originalPrice && (
                        <Text className="text-slate-400 text-sm line-through mr-2">
                          {plan.originalPrice}
                        </Text>
                      )}
                      <Text
                        className={`font-bold text-2xl ${
                          selectedPlan === plan.id
                            ? 'text-indigo-900'
                            : 'text-slate-900'
                        }`}
                      >
                        {plan.price}
                      </Text>
                      <Text
                        className={`text-sm ${
                          selectedPlan === plan.id
                            ? 'text-indigo-600'
                            : 'text-slate-600'
                        }`}
                      >
                        {plan.period}
                      </Text>
                    </View>
                    {plan.savings && (
                      <Text className="text-green-600 text-xs font-medium mt-1">
                        {plan.savings}
                      </Text>
                    )}
                  </View>
                </View>

                {selectedPlan === plan.id && (
                  <View className="flex-row items-center mt-2">
                    <Feather name="check-circle" size={16} color="#4F46E5" />
                    <Text className="text-indigo-600 text-sm font-medium ml-2">
                      Plan seleccionado
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Trial Info */}
          <View className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-emerald-100 rounded-full items-center justify-center mr-3">
                <Feather name="gift" size={18} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-emerald-900 font-semibold">
                  Prueba gratuita de 7 días
                </Text>
                <Text className="text-emerald-700 text-sm">
                  Cancela en cualquier momento sin costo
                </Text>
              </View>
            </View>
          </View>

          {/* CTA Button */}
          <TouchableOpacity
            className="bg-indigo-600 py-4 rounded-xl shadow-lg mb-4"
            activeOpacity={0.9}
          >
            <Text className="text-center text-white font-bold text-lg">
              Comenzar Prueba Gratuita
            </Text>
          </TouchableOpacity>

          {/* Terms */}
          <Text className="text-slate-500 text-xs text-center leading-4">
            Al continuar, aceptas nuestros{' '}
            <Text className="text-indigo-600 font-medium">
              Términos de Servicio
            </Text>{' '}
            y{' '}
            <Text className="text-indigo-600 font-medium">
              Política de Privacidad
            </Text>
            . La suscripción se renovará automáticamente.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
