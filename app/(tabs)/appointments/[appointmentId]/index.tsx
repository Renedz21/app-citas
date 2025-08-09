import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

export default function AppointmentDetails() {
  const { appointmentId } = useLocalSearchParams();
  console.log(appointmentId);

  return (
    <ScrollView
      className="flex-1 bg-white px-6"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 0, paddingBottom: 0 }}
    >
      {/* Header */}
      <View className="bg-white border-b border-slate-200 py-4">
        <Text className="text-slate-900 text-xl font-semibold">
          Appointment Details
        </Text>
        <Text className="text-slate-500 text-sm mt-1">
          Appointment ID: #APT-2024-001
        </Text>
      </View>

      <View className="py-4">
        {/* Status Badge */}
        <View className="flex-row items-center mb-6">
          <View className="bg-green-100 px-3 py-1 rounded-full">
            <Text className="text-green-800 text-sm font-medium">
              Confirmed
            </Text>
          </View>
        </View>

        {/* Appointment Summary Card */}
        <View className="bg-white rounded-xl border border-slate-200 p-6 mb-4">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <Text className="text-slate-900 text-lg font-semibold">
                Dr. John Doe
              </Text>
              <Text className="text-slate-600 text-sm">
                Licensed Clinical Psychologist
              </Text>
            </View>
            <View className="w-12 h-12 bg-indigo-100 rounded-full items-center justify-center">
              <Text className="text-indigo-600 text-lg font-bold">JD</Text>
            </View>
          </View>

          {/* Date & Time */}
          <View className="bg-slate-50 rounded-lg p-4 mb-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-slate-900 font-medium">Date & Time</Text>
                <Text className="text-slate-600 text-sm mt-1">
                  Thursday, August 15, 2024
                </Text>
                <Text className="text-slate-600 text-sm">
                  3:00 PM - 4:00 PM
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-slate-500 text-xs">Duration</Text>
                <Text className="text-slate-900 font-medium">60 min</Text>
              </View>
            </View>
          </View>

          {/* Location & Contact */}
          <View className="gap-y-3">
            <View>
              <Text className="text-slate-700 font-medium text-sm mb-1">
                Location
              </Text>
              <Text className="text-slate-600 text-sm">
                Professional Medical Center{'\n'}
                Suite 304, 123 Health Street{'\n'}
                New York, NY 10001
              </Text>
            </View>

            <View>
              <Text className="text-slate-700 font-medium text-sm mb-1">
                Contact
              </Text>
              <Text className="text-slate-600 text-sm">
                Phone: (555) 123-4567{'\n'}
                Email: john.doe@medcenter.com
              </Text>
            </View>
          </View>
        </View>

        {/* Financial Information */}
        <View className="bg-white rounded-xl border border-slate-200 p-6 mb-4">
          <Text className="text-slate-900 font-semibold mb-3">
            Payment Details
          </Text>
          <View className="flex-row justify-between items-center py-2">
            <Text className="text-slate-600">Consultation Fee</Text>
            <Text className="text-slate-900 font-medium">$50.00</Text>
          </View>
          <View className="flex-row justify-between items-center py-2 border-t border-slate-100 mt-2 pt-3">
            <Text className="text-slate-900 font-medium">Total Amount</Text>
            <Text className="text-slate-900 font-semibold text-lg">$50.00</Text>
          </View>
          <Text className="text-green-600 text-sm mt-2">
            ✓ Payment confirmed
          </Text>
        </View>

        {/* Preparation Notes */}
        <View className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <Text className="text-slate-900 font-semibold mb-3">
            Preparation & Notes
          </Text>
          <View className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <Text className="text-amber-800 text-sm leading-5">
              • Please arrive 10 minutes early for check-in{'\n'}• Bring your
              previous medical records and insurance card{'\n'}• The session
              will focus on stress management techniques{'\n'}• Wear comfortable
              clothing for relaxation exercises
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="gap-y-3 mb-8">
          <View className="flex-row gap-x-3">
            <TouchableOpacity className="flex-1 bg-white border border-slate-300 py-3 rounded-xl">
              <Text className="text-center text-slate-700 font-medium">
                Reschedule
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white border border-red-300 py-3 rounded-xl">
              <Text className="text-center text-red-600 font-medium">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="bg-white border border-slate-300 py-3 rounded-xl">
            <Text className="text-center text-slate-700 font-medium">
              Contact Provider
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
