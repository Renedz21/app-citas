import { View, Text, TouchableOpacity } from 'react-native';

interface BillingOptionProps {
  option: {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    period: string;
    savings?: string;
    isRecommended?: boolean;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export const BillingOption = ({
  option,
  isSelected,
  onSelect
}: BillingOptionProps) => (
  <TouchableOpacity
    className={`flex-row items-center p-4 rounded-lg border ${
      isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'
    }`}
    onPress={onSelect}
    activeOpacity={0.7}
  >
    <View
      className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
        isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
      }`}
    >
      {isSelected && <View className="w-2 h-2 bg-white rounded-full" />}
    </View>
    <View className="flex-1">
      <View className="flex-row items-center">
        <Text className="font-medium text-slate-900 mr-2">{option.title}</Text>
        {option.savings && (
          <View className="bg-blue-100 px-2 py-0.5 rounded">
            <Text className="text-blue-700 text-xs font-medium">
              {option.savings}
            </Text>
          </View>
        )}
      </View>
      <Text className="text-slate-500 text-sm">{option.subtitle}</Text>
    </View>
  </TouchableOpacity>
);
