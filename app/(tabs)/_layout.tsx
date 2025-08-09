import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

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
            <TabBarIcon name="home-outline" color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="appointments/index"
        options={{
          title: 'Citas',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar-outline" color={color} />
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
    </Tabs>
  );
}
