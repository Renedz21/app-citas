import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CalendarIcon from '@/assets/icons/calendar.svg';
import DollarSignIcon from '@/assets/icons/dollar-sign.svg';
import MailIcon from '@/assets/icons/mail.svg';
import PhoneIcon from '@/assets/icons/phone.svg';
import MessageCircleIcon from '@/assets/icons/message-circle.svg';
import FileTextIcon from '@/assets/icons/file-text.svg';
import StarIcon from '@/assets/icons/star.svg';
import WarningIcon from '@/assets/icons/warning.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import TagIcon from '@/assets/icons/tag.svg';
import ArrowLeftIcon from '@/assets/icons/chevron-left.svg';
import MoreVerticalIcon from '@/assets/icons/ellipsis-vertical.svg';
import { clients } from '@/constants/dummy-data';

const Tab = createMaterialTopTabNavigator();

// Overview Tab Component
function OverviewTab({ client }: { client: any }) {
  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-6">
        {/* Stats Cards */}
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1 bg-white rounded-xl p-4 border border-slate-200">
            <View className="flex-row items-center justify-between mb-2">
              <CalendarIcon width={20} height={20} color="#3B82F6" />
              <Text className="text-2xl font-bold text-slate-900">
                {client.totalSessions}
              </Text>
            </View>
            <Text className="text-slate-500 text-sm">Total Visitas</Text>
          </View>

          <View className="flex-1 bg-white rounded-xl p-4 border border-slate-200">
            <View className="flex-row items-center justify-between mb-2">
              <DollarSignIcon width={20} height={20} color="#10B981" />
              <Text className="text-2xl font-bold text-slate-900">$2,340</Text>
            </View>
            <Text className="text-slate-500 text-sm">Total Spent</Text>
          </View>
        </View>

        {/* Client Preferences */}
        <View className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <Text className="text-slate-900 font-semibold text-lg mb-4">
            Preferencias del Cliente
          </Text>

          <View className="gap-y-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-slate-600">Horario Preferido</Text>
              <Text className="text-slate-900 font-medium">
                Mañana (9-11 AM)
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-slate-600">Comunicación</Text>
              <Text className="text-slate-900 font-medium">Email & SMS</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-slate-600">Recordatorio</Text>
              <Text className="text-slate-900 font-medium">24 horas antes</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-slate-600">Método de Pago</Text>
              <Text className="text-slate-900 font-medium">
                Tarjeta de Crédito
              </Text>
            </View>
          </View>
        </View>

        {/* Health Information */}
        <View className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <Text className="text-slate-900 font-semibold text-lg mb-4">
            Información de Salud
          </Text>

          <View className="gap-y-4">
            <View className="flex-row items-start">
              <View className="w-6 h-6 bg-amber-100 rounded-full items-center justify-center mr-3 mt-0.5">
                <WarningIcon width={14} height={14} color="#F59E0B" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-900 font-medium mb-1">
                  Alergias
                </Text>
                <Text className="text-slate-600 text-sm">
                  Penicilina, Látex
                </Text>
              </View>
            </View>

            <View className="flex-row items-start">
              <View className="w-6 h-6 bg-blue-100 rounded-full items-center justify-center mr-3 mt-0.5">
                <StarIcon width={14} height={14} color="#3B82F6" />
              </View>
              <View className="flex-1">
                <Text className="text-slate-900 font-medium mb-1">
                  Notas Especiales
                </Text>
                <Text className="text-slate-600 text-sm">
                  Prefiere citas matutinas, sensible al frío
                </Text>
              </View>
            </View>

            {client.diagnosis && (
              <View className="flex-row items-start">
                <View className="w-6 h-6 bg-green-100 rounded-full items-center justify-center mr-3 mt-0.5">
                  <FileTextIcon width={14} height={14} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="text-slate-900 font-medium mb-1">
                    Diagnóstico
                  </Text>
                  <Text className="text-slate-600 text-sm">
                    {client.diagnosis}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Appointments Tab Component
function AppointmentsTab({ client }: { client: any }) {
  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-6">
        <Text className="text-slate-900 font-semibold text-lg mb-4">
          Historial de Citas
        </Text>

        {/* Upcoming Appointment */}
        {client.nextAppointment && (
          <View className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4">
            <View className="flex-row items-center mb-2">
              <ClockIcon width={20} height={20} color="#10B981" />
              <Text className="ml-2 text-emerald-800 font-medium">
                Próxima Cita
              </Text>
            </View>
            <Text className="text-emerald-700 text-sm">
              {new Date(client.nextAppointment).toLocaleDateString('es-ES', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}{' '}
              - 10:00 AM
            </Text>
          </View>
        )}

        {/* Recent Appointments */}
        <View className="gap-y-3">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <View
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-4"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-slate-900 font-medium">
                    Sesión de Terapia #{client.totalSessions - index}
                  </Text>
                  <Text className="text-slate-500 text-sm">
                    {new Date(
                      Date.now() - (index + 1) * 7 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString('es-ES')}
                  </Text>
                </View>
                <View className="bg-green-100 px-2 py-1 rounded-full">
                  <Text className="text-green-800 text-xs font-medium">
                    Completada
                  </Text>
                </View>
              </View>
              <Text className="text-slate-600 text-sm">
                Duración: 60 min • Tipo: Terapia Individual
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// Notes Tab Component
function NotesTab({ client }: { client: any }) {
  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-6">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-slate-900 font-semibold text-lg">
            Notas Clínicas
          </Text>
          <TouchableOpacity className="bg-indigo-600 px-4 py-2 rounded-lg">
            <Text className="text-white font-medium text-sm">+ Nueva Nota</Text>
          </TouchableOpacity>
        </View>

        <View className="gap-y-4">
          {[1, 2, 3].map((_, index) => (
            <View
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-4"
            >
              <View className="flex-row justify-between items-start mb-3">
                <Text className="text-slate-900 font-medium">
                  Sesión del{' '}
                  {new Date(
                    Date.now() - index * 7 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString('es-ES')}
                </Text>
                <Text className="text-slate-500 text-xs">
                  Dr. Alex Martínez
                </Text>
              </View>
              <Text className="text-slate-600 text-sm leading-5 mb-3">
                {index === 0
                  ? client.notes
                  : index === 1
                    ? 'Cliente muestra mejoría significativa en el manejo de la ansiedad. Continuar con técnicas de respiración.'
                    : 'Primera sesión. Cliente muy colaborativo, establecimiento de rapport exitoso.'}
              </Text>
              <View className="flex-row items-center">
                <TagIcon width={14} height={14} color="#64748B" />
                <Text className="ml-1 text-slate-500 text-xs">
                  {index === 0
                    ? 'Progreso'
                    : index === 1
                      ? 'Técnicas'
                      : 'Evaluación'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// Payments Tab Component
function PaymentsTab({ client }: { client: any }) {
  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      showsVerticalScrollIndicator={false}
    >
      <View className="p-6">
        <Text className="text-slate-900 font-semibold text-lg mb-4">
          Historial de Pagos
        </Text>

        {/* Payment Summary */}
        <View className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <Text className="text-slate-900 font-semibold mb-4">
            Resumen Financiero
          </Text>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-slate-600">Total Pagado</Text>
            <Text className="text-slate-900 font-semibold text-lg">$2,340</Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-slate-600">Pendiente</Text>
            <Text className="text-slate-900 font-medium">$0</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-slate-600">Método Preferido</Text>
            <Text className="text-slate-900 font-medium">
              Tarjeta **** 4532
            </Text>
          </View>
        </View>

        {/* Payment History */}
        <View className="gap-y-3">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <View
              key={index}
              className="bg-white rounded-xl border border-slate-200 p-4"
            >
              <View className="flex-row justify-between items-start mb-2">
                <View>
                  <Text className="text-slate-900 font-medium">
                    Sesión #{client.totalSessions - index}
                  </Text>
                  <Text className="text-slate-500 text-sm">
                    {new Date(
                      Date.now() - (index + 1) * 7 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString('es-ES')}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-slate-900 font-semibold">$60.00</Text>
                  <View className="bg-green-100 px-2 py-1 rounded-full mt-1">
                    <Text className="text-green-800 text-xs font-medium">
                      Pagado
                    </Text>
                  </View>
                </View>
              </View>
              <Text className="text-slate-600 text-sm">
                Tarjeta **** 4532 • Autorización: #
                {Math.random().toString().slice(2, 8)}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default function ClientDetailsScreen() {
  const { clientId } = useLocalSearchParams();
  const router = useRouter();

  // Find client by ID
  const client = clients.find((c) => c.id === clientId) || clients[0];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-white border-b border-slate-200 px-6 py-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 -ml-2 mr-3"
            >
              <ArrowLeftIcon width={24} height={24} color="#64748B" />
            </TouchableOpacity>
            <Text className="text-slate-900 text-xl font-semibold">
              Detalles del Cliente
            </Text>
          </View>
          <TouchableOpacity className="p-2">
            <MoreVerticalIcon width={20} height={20} color="#64748B" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Client Header Info */}
      <View className="bg-white px-6 py-6 border-b border-slate-200">
        <View className="flex-row items-center mb-4">
          <View className="w-16 h-16 bg-indigo-600 rounded-full items-center justify-center mr-4">
            <Text className="text-white font-bold text-xl">
              {client.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-slate-900 text-xl font-bold">
              {client.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <MailIcon width={14} height={14} color="#64748B" />
              <Text className="ml-1 text-slate-600 text-sm">
                {client.email}
              </Text>
            </View>
            <View className="flex-row items-center mt-1">
              <PhoneIcon width={14} height={14} color="#64748B" />
              <Text className="ml-1 text-slate-600 text-sm">
                {client.phone}
              </Text>
            </View>
          </View>
          <TouchableOpacity className="bg-indigo-100 p-2 rounded-lg">
            <MessageCircleIcon width={20} height={20} color="#4F46E5" />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View className="flex-row justify-between">
          <View className="items-center">
            <Text className="text-2xl font-bold text-slate-900">
              {client.totalSessions}
            </Text>
            <Text className="text-slate-500 text-xs">Total Visitas</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-slate-900">$2,340</Text>
            <Text className="text-slate-500 text-xs">Total Spent</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-slate-900">
              {formatDate(client.lastVisit)}
            </Text>
            <Text className="text-slate-500 text-xs">Last Visit</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#4F46E5',
          tabBarInactiveTintColor: '#64748B',
          tabBarIndicatorStyle: {
            backgroundColor: '#4F46E5',
            height: 3
          },
          tabBarStyle: {
            backgroundColor: 'white',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#E2E8F0'
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'none'
          }
        }}
      >
        <Tab.Screen name="Resumen" options={{ title: 'Resumen' }}>
          {() => <OverviewTab client={client} />}
        </Tab.Screen>
        <Tab.Screen name="Citas" options={{ title: 'Citas' }}>
          {() => <AppointmentsTab client={client} />}
        </Tab.Screen>
        <Tab.Screen name="Notas" options={{ title: 'Notas' }}>
          {() => <NotesTab client={client} />}
        </Tab.Screen>
        <Tab.Screen name="Pagos" options={{ title: 'Pagos' }}>
          {() => <PaymentsTab client={client} />}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
}
