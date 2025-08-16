import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormValues,
  fullSchema,
  StepKeys
} from '@/modules/schemas/onboarding.schema';
import { useOnboardingStore } from '@/modules/store/use-onboarding-store';
import { useUserOnboardingStore } from '@/modules/store/use-user-onboarding';
import { useUser } from '@clerk/clerk-expo';

export type OnboardingStep =
  | 'user-type'
  | 'professional-info'
  | 'client-info'
  | 'complete';
export type UserType = 'professional' | 'client' | null;

const STEPS: StepKeys[] = ['profileType', 'professionalData', 'clientData'];

export default function useOnboarding() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const { formData, updateFormData, clearFormData } = useOnboardingStore();
  const { setOnboardingCompleted } = useUserOnboardingStore();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('user-type');
  const [userType, setUserType] = useState<UserType>(null);

  const methods = useForm<FormValues>({
    resolver: zodResolver(fullSchema),
    defaultValues: formData as FormValues,
    mode: 'onChange'
  });

  const { handleSubmit, watch, trigger, getValues } = methods;

  const getStepProgress = () => {
    switch (currentStep) {
      case 'user-type':
        return 1;
      case 'professional-info':
      case 'client-info':
        return 2;
      case 'complete':
        return 3;
      default:
        return 1;
    }
  };

  const handleUserTypeSelect = (
    type: UserType,
    onAnimate?: (step: OnboardingStep) => void
  ) => {
    setUserType(type);

    methods.setValue('profileType.profile_type', type || '');
    updateFormData('profileType', { profile_type: type || '' } as any);

    const nextStep =
      type === 'professional' ? 'professional-info' : 'client-info';
    if (nextStep && type) {
      setCurrentStep(nextStep);
      onAnimate?.(nextStep);
    }
  };

  const handleNext = async (
    onSuccess?: (step: OnboardingStep) => void,
    onError?: () => void
  ): Promise<boolean> => {
    const currentStepKey = getCurrentStepKey();
    if (currentStepKey) {
      const isValid = await trigger(currentStepKey);
      if (isValid) {
        const values = getValues();
        updateFormData(currentStepKey, values[currentStepKey] as any);

        if (
          currentStep === 'professional-info' ||
          currentStep === 'client-info'
        ) {
          setCurrentStep('complete');
          const finalData = getValues();
          onSubmit(finalData);
          onSuccess?.('complete');
        }
        return true;
      } else {
        onError?.();
      }
    }
    return false;
  };

  const handleBack = (onAnimate?: (step: OnboardingStep) => void) => {
    setCurrentStep('user-type');
    onAnimate?.('user-type');
  };

  const handleStart = () => {
    // Mark onboarding as completed
    setOnboardingCompleted(true);
    clearFormData();
    router.replace('/(tabs)');
  };

  const getCurrentStepKey = (): StepKeys | null => {
    switch (currentStep) {
      case 'user-type':
        return 'profileType';
      case 'professional-info':
        return 'professionalData';
      case 'client-info':
        return 'clientData';
      default:
        return null;
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      console.log('Onboarding completed with data:', data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name && value && type === 'change') {
        const stepKey = name.split('.')[0] as StepKeys;
        if (STEPS.includes(stepKey) && value[stepKey]) {
          updateFormData(stepKey, value[stepKey] as any);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData]);

  return {
    methods,
    handleSubmit,
    onSubmit,

    currentStep,
    setCurrentStep,
    userType,
    getStepProgress,
    handleUserTypeSelect,
    handleNext,
    handleBack,
    handleStart,

    formData,

    trigger,
    getCurrentStepKey
  };
}
