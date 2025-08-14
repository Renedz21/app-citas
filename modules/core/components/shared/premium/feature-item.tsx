import { View, Text } from 'react-native';

import BarChartIcon from '@/assets/icons/chart.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import UsersIcon from '@/assets/icons/users.svg';
import FileTextIcon from '@/assets/icons/file-text.svg';
import ShieldIcon from '@/assets/icons/shield.svg';
import ZapIcon from '@/assets/icons/zap.svg';
import PhoneIcon from '@/assets/icons/phone.svg';
import DownloadIcon from '@/assets/icons/download.svg';

type FeatureIcon =
  | typeof BarChartIcon
  | typeof CalendarIcon
  | typeof UsersIcon
  | typeof FileTextIcon
  | typeof ShieldIcon
  | typeof ZapIcon
  | typeof PhoneIcon
  | typeof DownloadIcon;

interface FeatureItemProps {
  feature: {
    icon: FeatureIcon;
    title: string;
    description: string;
    color: string;
  };
}

export const FeatureItem = ({ feature }: FeatureItemProps) => (
  <View className="flex-row items-start">
    <View
      className="w-12 h-12 rounded-full items-center justify-center mr-4"
      style={{ backgroundColor: `${feature.color}15` }}
    >
      <feature.icon width={20} height={20} color={feature.color} />
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
);
