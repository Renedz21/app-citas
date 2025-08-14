import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function AppointmentDetails() {
  return (
    <ScrollView
      className="flex-1 bg-white px-6"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 0, paddingBottom: 0 }}
    >
      {/* Header */}
      <View className="bg-white border-b border-slate-200 py-4">
        <Text className="text-slate-900 text-xl font-semibold">
          Detalles de la cita
        </Text>
        <Text className="text-slate-500 text-sm mt-1">
          Código de la cita: #APT-2024-001
        </Text>
      </View>

      <View className="py-4">
        {/* Status Badge */}
        <View className="flex-row items-center mb-6">
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-800 text-sm font-medium">
              Confirmada
            </Text>
          </View>
        </View>

        {/* Appointment Summary Card */}
        <View className="bg-white rounded-xl border border-slate-200 p-6 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <Text className="text-slate-900 text-lg font-semibold">
                Dr. Juan Pérez
              </Text>
              <Text className="text-slate-600 text-sm">Psicología Clínica</Text>
            </View>
            <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center">
              <Text className="text-indigo-600 text-lg font-bold">JP</Text>
            </View>
          </View>

          {/* Date & Time */}
          <View className="bg-slate-50 rounded-lg p-4 mb-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-slate-900 font-medium">Fecha y hora</Text>
                <Text className="text-slate-600 text-sm mt-1">
                  Jueves, 15 de Agosto, 2024
                </Text>
                <Text className="text-slate-600 text-sm">
                  3:00 PM - 4:00 PM
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-slate-500 text-xs">Duración</Text>
                <Text className="text-slate-900 font-medium">60 min</Text>
              </View>
            </View>
          </View>

          {/* Location & Contact */}
          <View className="gap-y-3">
            <View>
              <Text className="text-slate-700 font-medium text-sm mb-1">
                Locación
              </Text>
              <Text className="text-slate-600 text-sm">
                Centro Médico Profesional{'\n'}
                Suite 304, 123 Calle Salud{'\n'}
                Lima, Perú
              </Text>
            </View>

            <View>
              <Text className="text-slate-700 font-medium text-sm mb-1">
                Contacto
              </Text>
              <Text className="text-slate-600 text-sm">
                Teléfono: (555) 123-4567{'\n'}
                Email: juan.perez@centromedico.com
              </Text>
            </View>
          </View>
        </View>

        {/* Financial Information */}
        <View className="bg-white rounded-xl border border-slate-200 p-6 mb-4">
          <Text className="text-slate-900 font-semibold mb-3">
            Detalles de pago
          </Text>
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-slate-600">Tarifa de consulta</Text>
            <Text className="text-slate-900 font-medium">S/150.00</Text>
          </View>
          <View className="flex-row justify-between items-center py-2 border-t border-slate-100 mt-2 pt-3">
            <Text className="text-slate-900 font-medium">Total</Text>
            <Text className="text-slate-900 font-semibold text-lg">
              S/150.00
            </Text>
          </View>
          <Text className="text-green-600 text-sm mt-2">✓ Pago confirmado</Text>
        </View>

        {/* Preparation Notes */}
        <View className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <Text className="text-slate-900 font-semibold mb-3">
            Preparación y notas
          </Text>
          <View className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <Text className="text-amber-800 text-sm leading-5">
              • Por favor, llegue 10 minutos antes para el check-in{'\n'}•
              Traiga sus historias médicas y tarjeta de seguro{'\n'}• La sesión
              se centrará en técnicas de manejo del estrés{'\n'}• Vaya con ropa
              cómoda para ejercicios de relajación
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="gap-y-3">
          <View className="flex-row gap-x-3">
            <TouchableOpacity className="flex-1 bg-white border border-slate-300 py-3 rounded-xl">
              <Text className="text-center text-slate-700 font-medium">
                Reagendar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white border border-red-300 py-3 rounded-xl">
              <Text className="text-center text-red-600 font-medium">
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="bg-white border border-slate-300 py-3 rounded-xl">
            <Text className="text-center text-slate-700 font-medium">
              Contactar profesional
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
