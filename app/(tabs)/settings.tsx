import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';

import {
  SETTINGS_PROFILE,
  PREMIUM_CONFIG,
  SETTINGS_SECTIONS,
  EditIcon,
  ChevronRightIcon,
  type SettingItem
} from '@/constants/settings-config';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [appointmentReminders, setAppointmentReminders] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(false);
  const router = useRouter();

  const getSwitchState = (itemId: string) => {
    switch (itemId) {
      case 'push-notifications':
        return notificationsEnabled;
      case 'appointment-reminders':
        return appointmentReminders;
      case 'email-notifications':
        return emailNotifications;
      default:
        return false;
    }
  };

  const setSwitchState = (itemId: string, value: boolean) => {
    switch (itemId) {
      case 'push-notifications':
        setNotificationsEnabled(value);
        break;
      case 'appointment-reminders':
        setAppointmentReminders(value);
        break;
      case 'email-notifications':
        setEmailNotifications(value);
        break;
    }
  };

  const handleItemPress = (item: SettingItem) => {
    if (item.type === 'navigation' && item.href) {
      router.push(item.href as any);
    } else if (item.type === 'action' && item.action) {
      item.action();
    }
    // For other actions, you can add custom handlers here
  };

  const renderSettingItem = (item: SettingItem, isLast: boolean = false) => {
    const Icon = item.icon;

    return (
      <TouchableOpacity
        key={item.id}
        className={`flex-row items-center justify-between p-4 ${!isLast ? 'border-b border-slate-100' : ''}`}
        onPress={() => handleItemPress(item)}
        disabled={item.type === 'switch'}
      >
        <View className="flex-row items-center">
          <View
            className={`w-10 h-10 ${item.iconBgColor} rounded-full items-center justify-center mr-3`}
          >
            <Icon width={18} height={18} color={item.iconColor} />
          </View>
          <View>
            <Text
              className={`font-medium ${item.id === 'logout' ? 'text-red-600' : 'text-slate-900'}`}
            >
              {item.title}
            </Text>
            <Text className="text-slate-500 text-sm">{item.subtitle}</Text>
          </View>
        </View>

        {item.type === 'switch' ? (
          <Switch
            value={getSwitchState(item.id)}
            onValueChange={(value) => setSwitchState(item.id, value)}
            trackColor={{ false: '#E2E8F0', true: '#4F46E5' }}
            thumbColor={getSwitchState(item.id) ? '#ffffff' : '#f4f3f4'}
          />
        ) : (
          <ChevronRightIcon width={20} height={20} color="#94A3B8" />
        )}
      </TouchableOpacity>
    );
  };

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
              <Text className="text-white font-bold text-xl">
                {SETTINGS_PROFILE.initials}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-slate-900 text-xl font-bold">
                {SETTINGS_PROFILE.name}
              </Text>
              <Text className="text-slate-600 text-sm">
                {SETTINGS_PROFILE.specialty}
              </Text>
              <Text className="text-slate-500 text-sm">
                {SETTINGS_PROFILE.email}
              </Text>
            </View>
            <TouchableOpacity className="bg-slate-100 p-2 rounded-lg">
              <EditIcon width={20} height={20} color="#64748B" />
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
              onPress={() => router.push(PREMIUM_CONFIG.href as any)}
              activeOpacity={0.9}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <View className="flex-row items-center mb-2">
                    <View className="w-8 h-8 bg-white/20 rounded-full items-center justify-center mr-3">
                      <PREMIUM_CONFIG.icon
                        width={16}
                        height={16}
                        color="white"
                      />
                    </View>
                    <Text className="text-white font-bold text-lg">
                      {PREMIUM_CONFIG.title}
                    </Text>
                  </View>
                  <Text className="text-white/90 text-sm mb-3">
                    {PREMIUM_CONFIG.subtitle}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-white font-semibold text-base">
                      {PREMIUM_CONFIG.price}
                    </Text>
                    <View className="bg-white/20 px-2 py-1 rounded-full ml-2">
                      <Text className="text-white text-xs font-medium">
                        {PREMIUM_CONFIG.trial}
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
                  <ChevronRightIcon width={20} height={20} color="white" />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Dynamic Sections */}
          {SETTINGS_SECTIONS.map((section) => (
            <View
              key={section.id}
              className={section.id === 'support' ? 'mb-8' : 'mb-6'}
            >
              <Text className="text-slate-900 font-semibold text-lg mb-4">
                {section.title}
              </Text>
              <View className="bg-white rounded-xl border border-slate-200">
                {section.items.map((item, index) =>
                  renderSettingItem(item, index === section.items.length - 1)
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
