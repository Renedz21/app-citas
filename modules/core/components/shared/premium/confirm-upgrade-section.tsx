import { View, Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import ChevronDownIcon from '@/assets/icons/chevron-right.svg';
import { PriceDisplay } from '@/modules/core/components/shared/premium/price-display';
import { PricingBreakdownRow } from '@/modules/core/components/shared/premium/pricing-breakdown-row';
import { useAccordionAnimation } from '@/modules/core/hooks/premium/use-accordion-animation';

interface ConfirmUpgradeSectionProps {
  selectedPlan: string;
  isOpen: boolean;
  onToggle: () => void;
  pricing: {
    totalPrice: number;
    period: string;
    originalYearlyPrice: number;
    savingsAmount: number;
  };
  basePrice: number;
  yearlyPrice: number;
  membersCount: number;
}

export const ConfirmUpgradeSection = ({
  selectedPlan,
  isOpen,
  onToggle,
  pricing,
  basePrice,
  yearlyPrice,
  membersCount
}: ConfirmUpgradeSectionProps) => {
  const { chevronStyle, contentStyle } = useAccordionAnimation(isOpen);
  const { totalPrice, period, originalYearlyPrice, savingsAmount } = pricing;

  return (
    <View className="bg-white rounded-lg border border-slate-200 mb-6">
      <TouchableOpacity
        className="flex-row items-center justify-between p-4"
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View className="flex-1">
          <Text className="font-medium text-base text-slate-900 mb-1">
            Confirmar actualización a Premium
          </Text>
          <PriceDisplay
            selectedPlan={selectedPlan}
            totalPrice={totalPrice}
            period={period}
            originalYearlyPrice={originalYearlyPrice}
            discountedYearlyPrice={yearlyPrice}
          />
        </View>
        <Animated.View style={chevronStyle}>
          <ChevronDownIcon width={20} height={20} color="#64748B" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={contentStyle}>
        <View className="px-4 pb-4">
          <View className="gap-y-4">
            {selectedPlan === 'yearly' && (
              <View className="flex-row justify-between items-center py-2 border-b border-slate-100">
                <Text className="text-slate-600">x ${basePrice} / mes</Text>
                <View className="flex-row items-center">
                  <Text className="text-slate-400 line-through mr-2">
                    ${originalYearlyPrice}
                  </Text>
                  <Text className="text-green-600 font-medium">
                    -${savingsAmount}
                  </Text>
                </View>
              </View>
            )}
            <PricingBreakdownRow
              label="Subtotal"
              value={`$${totalPrice}.00`}
              isLast
            />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};
