import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';

import ScheduleCard from '@/modules/core/components/shared/schedule-card';

import PlusUserIcon from '@/assets/icons/user-plus.svg';
import PlusCalendarIcon from '@/assets/icons/calendar-plus.svg';
import BellIcon from '@/assets/icons/bell.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import UsersIcon from '@/assets/icons/users.svg';
import BarChartIcon from '@/assets/icons/chart.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import { Link } from 'expo-router';

import { appointments } from '@/constants/dummy-data';

export default function DashboardScreen() {
  return (
    <ScrollView
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 0, paddingBottom: 20 }}
    >
      {/* Header */}
      <View className="bg-white border-b border-slate-200 px-6 py-6">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-slate-500 text-sm">Buenos días,</Text>
            <Text className="text-slate-900 text-xl font-semibold mt-1">
              Dr. Alex Martínez
            </Text>
            <Text className="text-slate-600 text-sm mt-1">
              Psicología Clínica
            </Text>
          </View>
          <View className="flex-row items-center gap-3">
            <TouchableOpacity className="p-2 bg-slate-100 rounded-full">
              <BellIcon width={20} height={20} color="#64748B" />
            </TouchableOpacity>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              className="w-10 h-10 rounded-full border border-slate-200"
            />
          </View>
        </View>
      </View>

      <View className="px-6 py-4">
        {/* Stats Overview */}
        <View className="mb-6">
          <Text className="text-slate-900 text-lg font-semibold mb-4">
            Resumen de Hoy
          </Text>
          <View className="flex-row flex-wrap gap-3">
            <StatCard
              icon={<CalendarIcon width={20} height={20} color="#3B82F6" />}
              title="Citas de hoy"
              value="5"
              subtitle="1 pendiente"
              bgColor="bg-blue-50"
              textColor="text-blue-600"
            />
            <StatCard
              icon={<UsersIcon width={20} height={20} color="#8B5CF6" />}
              title="Clientes totales"
              value="152"
              subtitle="+5 este mes"
              bgColor="bg-purple-50"
              textColor="text-purple-600"
            />
            <StatCard
              icon={<ClockIcon width={20} height={20} color="#F59E0B" />}
              title="Próxima cita"
              value="4:00 PM"
              subtitle="Carla Torres"
              bgColor="bg-amber-50"
              textColor="text-amber-600"
            />
            <StatCard
              icon={<BarChartIcon width={20} height={20} color="#10B981" />}
              title="Ingresos este mes"
              value="$3,250"
              subtitle="+12% vs pasado"
              bgColor="bg-emerald-50"
              textColor="text-emerald-600"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-slate-900 text-lg font-semibold mb-4">
            Acciones Rápidas
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity className="flex-1 bg-indigo-600 py-4 px-4 rounded-xl">
              <View className="items-center">
                <PlusCalendarIcon width={24} height={24} color="white" />
                <Text className="text-white font-medium text-sm mt-1">
                  Nueva Cita
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white border border-slate-200 py-4 px-4 rounded-xl">
              <View className="items-center">
                <CalendarIcon width={24} height={24} color="#64748B" />
                <Text className="text-slate-700 font-medium text-sm mt-1">
                  Ver Agenda
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-white border border-slate-200 py-4 px-4 rounded-xl">
              <View className="items-center">
                <PlusUserIcon width={24} height={24} color="#64748B" />
                <Text className="text-slate-700 font-medium text-sm mt-1">
                  Nuevo Cliente
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Schedule */}
        <View className="mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-slate-900 text-lg font-semibold">
              Agenda de Hoy
            </Text>
            <Link
              href="/appointments"
              className="text-indigo-600 font-medium text-sm"
            >
              Ver todo
            </Link>
          </View>
        </View>

        <View className="gap-y-3">
          {appointments?.slice(0, 3).map((appointment) => (
            <ScheduleCard key={appointment.id} {...appointment} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function StatCard({
  icon,
  title,
  value,
  subtitle,
  bgColor,
  textColor
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
}) {
  return (
    <View
      className={`${bgColor} rounded-xl p-4 flex-1 min-w-[48%] border border-slate-100`}
    >
      <View className="mb-3">{icon}</View>
      <Text className="text-slate-600 text-xs font-medium uppercase tracking-wide">
        {title}
      </Text>
      <Text className={`text-xl font-bold ${textColor} mt-1`}>{value}</Text>
      <Text className="text-slate-500 text-xs mt-1">{subtitle}</Text>
    </View>
  );
}
