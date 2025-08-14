import { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { usePricingCalculations } from '@/modules/core/hooks/premium/use-pricing-calculations';

import { Header } from '@/modules/core/components/shared/premium/header';
import { HeroSection } from '@/modules/core/components/shared/premium/hero-section';
import { FeaturesSection } from '@/modules/core/components/shared/premium/features-section';
import { BillingSection } from '@/modules/core/components/shared/premium/billing-section';
import { ConfirmUpgradeSection } from '@/modules/core/components/shared/premium/confirm-upgrade-section';
import { ActionButtons } from '@/modules/core/components/shared/premium/action-buttons';
import {
  FEATURES,
  BILLING_OPTIONS,
  PRICING_CONFIG
} from '@/modules/core/components/shared/premium/constants';
import GiftIcon from '@/assets/icons/gift.svg';

export default function PremiumScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [confirmAccordionOpen, setConfirmAccordionOpen] = useState(false);

  const pricing = usePricingCalculations(selectedPlan);

  return (
    <View className="flex-1 bg-slate-50">
      <Header onBack={() => router.back()} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <HeroSection />

        <View className="flex-1 px-6 py-6">
          <FeaturesSection features={FEATURES} />

          <BillingSection
            selectedPlan={selectedPlan}
            onPlanSelect={setSelectedPlan}
            billingOptions={BILLING_OPTIONS}
          />

          <ConfirmUpgradeSection
            selectedPlan={selectedPlan}
            isOpen={confirmAccordionOpen}
            onToggle={() => setConfirmAccordionOpen((prev) => !prev)}
            pricing={pricing}
            basePrice={PRICING_CONFIG.basePrice}
            yearlyPrice={PRICING_CONFIG.yearlyPrice}
            membersCount={PRICING_CONFIG.membersCount}
          />

          {/* Trial Info */}
          <View className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-emerald-100 rounded-full items-center justify-center mr-3">
                <GiftIcon width={18} height={18} color="#10B981" />
              </View>
              <View className="flex-1">
                <Text className="text-emerald-900 font-semibold">
                  Prueba gratuita de 7 días
                </Text>
                <Text className="text-emerald-700 text-sm">
                  Cancela en cualquier momento sin costo
                </Text>
              </View>
            </View>
          </View>
          <ActionButtons />
        </View>
      </ScrollView>
    </View>
  );
}
