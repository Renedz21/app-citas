import { View, Text } from 'react-native';
import { FeatureItem } from '@/modules/core/components/shared/premium/feature-item';

interface FeaturesSectionProps {
  features: {
    icon: any;
    title: string;
    description: string;
    color: string;
  }[];
}

export const FeaturesSection = ({ features }: FeaturesSectionProps) => (
  <View className="bg-white rounded-lg border border-slate-200 mb-4">
    <View className="px-6 py-8">
      <Text className="text-slate-900 text-2xl font-bold text-center mb-2">
        Características Premium
      </Text>
      <Text className="text-slate-600 text-center mb-8">
        Todo lo que necesitas para una práctica exitosa
      </Text>
      <View className="gap-y-6">
        {features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} />
        ))}
      </View>
    </View>
  </View>
);
