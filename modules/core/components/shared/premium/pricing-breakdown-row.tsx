import { View, Text } from 'react-native';

interface PricingBreakdownRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

export const PricingBreakdownRow = ({
  label,
  value,
  isLast = false
}: PricingBreakdownRowProps) => (
  <View
    className={`flex-row justify-between items-center py-2 ${!isLast ? 'border-b border-slate-100' : ''}`}
  >
    <Text className="text-slate-600">{label}</Text>
    <Text className="text-slate-900">{value}</Text>
  </View>
);
