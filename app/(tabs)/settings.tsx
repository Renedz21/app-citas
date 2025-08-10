import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [appointmentReminders, setAppointmentReminders] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(false);
  const router = useRouter();

  return (
    <View className="flex-1 bg-slate-50">
      {/* Header */}
      <View className="bg-white border-b border-slate-200 px-6 py-4">
        <Text className="text-slate-900 text-xl font-semibold">
          Configuración
        </Text>
        <Text className="text-slate-500 text-sm mt-1">
          Gestiona tu cuenta y preferencias
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View className="bg-white px-6 py-6 border-b border-slate-200">
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-indigo-600 rounded-full items-center justify-center mr-4">
              <Text className="text-white font-bold text-xl">AM</Text>
            </View>
            <View className="flex-1">
              <Text className="text-slate-900 text-xl font-bold">
                Dr. Alex Martínez
              </Text>
              <Text className="text-slate-600 text-sm">
                Psicología Clínica • Lic. #12345
              </Text>
              <Text className="text-slate-500 text-sm">
                alex.martinez@clinica.com
              </Text>
            </View>
            <TouchableOpacity className="bg-slate-100 p-2 rounded-lg">
              <Feather name="edit-3" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-6 py-4">
          {/* Premium Upgrade */}
          <View className="mb-6">
            <TouchableOpacity
              className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-4"
              style={{
                backgroundColor: '#4F46E5',
                shadowColor: '#4F46E5',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8
              }}
              onPress={() => router.push('/premium')}
              activeOpacity={0.9}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <View className="w-8 h-8 bg-white/20 rounded-full items-center justify-center mr-3">
                      <Feather name="star" size={16} color="white" />
                    </View>
                    <Text className="text-white font-bold text-lg">
                      Upgrade to Premium
                    </Text>
                  </View>
                  <Text className="text-white/90 text-sm mb-3">
                    Desbloquea características avanzadas y análisis
                    profesionales
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-white font-semibold text-base">
                      Desde $25/mes
                    </Text>
                    <View className="bg-white/20 px-2 py-1 rounded-full ml-2">
                      <Text className="text-white text-xs font-medium">
                        7 días gratis
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
                  <Feather name="arrow-right" size={20} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Account Settings */}
          <View className="mb-6">
            <Text className="text-slate-900 font-semibold text-lg mb-4">
              Cuenta
            </Text>
            <View className="bg-white rounded-xl border border-slate-200">
              <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-100">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <Feather name="user" size={18} color="#3B82F6" />
                  </View>
                  <View>
                    <Text className="text-slate-900 font-medium">
                      Editar Perfil
                    </Text>
                    <Text className="text-slate-500 text-sm">
                      Información personal
                    </Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-100">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                    <Feather name="lock" size={18} color="#10B981" />
                  </View>
                  <View>
                    <Text className="text-slate-900 font-medium">
                      Seguridad
                    </Text>
                    <Text className="text-slate-500 text-sm">
                      Contraseña y autenticación
                    </Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-3">
                    <Feather name="credit-card" size={18} color="#8B5CF6" />
                  </View>
                  <View>
                    <Text className="text-slate-900 font-medium">
                      Facturación
                    </Text>
                    <Text className="text-slate-500 text-sm">
                      Métodos de pago y facturas
                    </Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Practice Settings */}
          <View className="mb-6">
            <Text className="text-slate-900 font-semibold text-lg mb-4">
              Práctica Profesional
            </Text>
            <View className="bg-white rounded-xl border border-slate-200">
              <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-100">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center mr-3">
                    <Feather name="calendar" size={18} color="#4F46E5" />
                  </View>
                  <View>
                    <Text className="text-slate-900 font-medium">Horarios</Text>
                    <Text className="text-slate-500 text-sm">
                      Disponibilidad y horarios
                    </Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-100">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-amber-100 rounded-full items-center justify-center mr-3">
                    <Feather name="map-pin" size={18} color="#F59E0B" />
                  </View>
                  <View>
                    <Text className="text-slate-900 font-medium">
                      Ubicación
                    </Text>
                    <Text className="text-slate-500 text-sm">
                      Dirección del consultorio
                    </Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-emerald-100 rounded-full items-center justify-center mr-3">
                    <Feather name="dollar-sign" size={18} color="#10B981" />
                  </View>
                  <View>
                    <Text className="text-slate-900 font-medium">Tarifas</Text>
                    <Text className="text-slate-500 text-sm">
                      Precios de consultas
                    </Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Notifications */}
          <View className="mb-6">
            <Text className="text-slate-900 font-semibold text-lg mb-4">
              Notificaciones
            </Text>
            <View className="bg-white rounded-xl border border-slate-200">
              <View className="flex-row items-center justify-between p-4 border-b border-slate-100">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <Feather name="bell" size={18} color="#3B82F6" />
                  </View>
                  <View>
                    <Text className="text-slate-900 font-medium">
                      Notificaciones Push
                    </Text>
                    <Text className="text-slate-500 text-sm">
                      Alertas en el dispositivo
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#E2E8F0', true: '#4F46E5' }}
                  thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
                />
              </View>

              <View className="flex-row items-center justify-between p-4 border-b border-slate-100">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                    <Feather name="clock" size={18} color="#10B981" />
                  </View>
                  <View>
                    <Text className="text-slate-900 font-medium">
                      Recordatorios de Citas
                    </Text>
                    <Text className="text-slate-500 text-sm">
                      Avisos antes de las citas
                    </Text>
                  </View>
                </View>
                <Switch
                  value={appointmentReminders}
                  onValueChange={setAppointmentReminders}
                  trackColor={{ false: '#E2E8F0', true: '#4F46E5' }}
                  thumbColor={appointmentReminders ? '#ffffff' : '#f4f3f4'}
                />
              </View>

              <View className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-3">
                    <Feather name="mail" size={18} color="#8B5CF6" />
                  </View>
                  <View>
                    <Text className="text-slate-900 font-medium">
                      Notificaciones por Email
                    </Text>
                    <Text className="text-slate-500 text-sm">
                      Resúmenes y reportes
                    </Text>
                  </View>
                </View>
                <Switch
                  value={emailNotifications}
                  onValueChange={setEmailNotifications}
                  trackColor={{ false: '#E2E8F0', true: '#4F46E5' }}
                  thumbColor={emailNotifications ? '#ffffff' : '#f4f3f4'}
                />
              </View>
            </View>
          </View>

          {/* Support & About */}
          <View className="mb-8">
            <Text className="text-slate-900 font-semibold text-lg mb-4">
              Soporte y Acerca de
            </Text>
            <View className="bg-white rounded-xl border border-slate-200">
              <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-100">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                    <Feather name="help-circle" size={18} color="#3B82F6" />
                  </View>
                  <View>
                    <Text className="text-slate-900 font-medium">
                      Centro de Ayuda
                    </Text>
                    <Text className="text-slate-500 text-sm">FAQ y guías</Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-100">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                    <Feather name="message-circle" size={18} color="#10B981" />
                  </View>
                  <View>
                    <Text className="text-slate-900 font-medium">
                      Contactar Soporte
                    </Text>
                    <Text className="text-slate-500 text-sm">
                      Ayuda técnica
                    </Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-100">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center mr-3">
                    <Feather name="info" size={18} color="#64748B" />
                  </View>
                  <View>
                    <Text className="text-slate-900 font-medium">
                      Acerca de la App
                    </Text>
                    <Text className="text-slate-500 text-sm">
                      Versión 1.0.0
                    </Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-row items-center justify-between p-4">
                <View className="flex-row items-center">
                  <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center mr-3">
                    <Feather name="log-out" size={18} color="#EF4444" />
                  </View>
                  <View>
                    <Text className="text-red-600 font-medium">
                      Cerrar Sesión
                    </Text>
                    <Text className="text-slate-500 text-sm">
                      Salir de la cuenta
                    </Text>
                  </View>
                </View>
                <Feather name="chevron-right" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
