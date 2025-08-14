import { View, Text } from 'react-native';

interface PriceDisplayProps {
  selectedPlan: string;
  totalPrice: number;
  period: string;
  originalYearlyPrice: number;
  discountedYearlyPrice: number;
}

export const PriceDisplay = ({
  selectedPlan,
  totalPrice,
  period,
  originalYearlyPrice,
  discountedYearlyPrice
}: PriceDisplayProps) => (
  <View className="flex-row items-baseline">
    {selectedPlan === 'yearly' ? (
      <>
        <Text className="text-slate-400 line-through text-lg mr-2">
          ${originalYearlyPrice}
        </Text>
        <Text className="text-2xl font-bold text-slate-900">
          ${discountedYearlyPrice}
        </Text>
        <Text className="text-slate-500 ml-1">/ {period}</Text>
      </>
    ) : (
      <>
        <Text className="text-2xl font-bold text-slate-900">${totalPrice}</Text>
        <Text className="text-slate-500 ml-1">/ {period}</Text>
      </>
    )}
  </View>
);
