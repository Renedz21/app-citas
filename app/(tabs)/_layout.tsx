import { Tabs } from 'expo-router';

import HomeIcon from '@/assets/icons/home.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import PeopleIcon from '@/assets/icons/users.svg';
import SettingsIcon from '@/assets/icons/settings.svg';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <HomeIcon width={24} height={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="appointments/index"
        options={{
          title: 'Citas',
          tabBarIcon: ({ color }) => (
            <CalendarIcon width={24} height={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="appointments/[appointmentId]/index"
        options={{
          title: 'Cita',
          href: null
        }}
      />
      <Tabs.Screen
        name="clients/index"
        options={{
          title: 'Clientes',
          tabBarIcon: ({ color }) => (
            <PeopleIcon width={24} height={24} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="clients/[clientId]"
        options={{
          title: 'Cliente',
          href: null
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configuración',
          tabBarIcon: ({ color }) => (
            <SettingsIcon width={24} height={24} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
