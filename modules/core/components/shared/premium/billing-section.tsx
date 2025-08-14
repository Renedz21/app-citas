import { View, Text } from 'react-native';
import { BillingOption } from './billing-option';

interface BillingSectionProps {
  selectedPlan: string;
  onPlanSelect: (plan: string) => void;
  billingOptions: {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    period: string;
    savings?: string;
    isRecommended?: boolean;
  }[];
}

export const BillingSection = ({
  selectedPlan,
  onPlanSelect,
  billingOptions
}: BillingSectionProps) => (
  <View className="bg-white rounded-lg border border-slate-200 mb-4 p-4">
    <View className="gap-y-3">
      <Text className="text-slate-900 font-medium text-base">
        Billing options
      </Text>
      {billingOptions.map((option) => (
        <BillingOption
          key={option.id}
          option={option}
          isSelected={selectedPlan === option.id}
          onSelect={() => onPlanSelect(option.id)}
        />
      ))}
    </View>
  </View>
);
