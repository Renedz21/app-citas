import React, { Fragment, useMemo } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { FormProvider, FieldError } from 'react-hook-form';

import { ProgressHeader } from '../modules/core/components/shared/onboarding/progress-header';
import { UserTypeSelection } from '../modules/core/components/shared/onboarding/user-type-selection';
import { ProfessionalInfo } from '../modules/core/components/shared/onboarding/professional-info';
import { ClientInfo } from '../modules/core/components/shared/onboarding/client-info';
import { CompletionScreen } from '../modules/core/components/shared/onboarding/completion-screen';

import useOnboarding from '../modules/core/hooks/onboarding/use-onboarding';
import { useOnboardingAnimations } from '../modules/core/hooks/onboarding/use-onboarding-animations';

export default function OnboardingScreen() {
  const {
    methods,
    currentStep,
    userType,
    getStepProgress,
    handleUserTypeSelect,
    handleNext,
    handleBack,
    handleStart,
    getCurrentStepKey
  } = useOnboarding();

  const {
    animateStepTransition,
    startCelebrationAnimation,
    animatedContentStyle,
    animatedProgressStyle,
    celebrationStyle
  } = useOnboardingAnimations();

  const onUserTypeSelect = (type: typeof userType) => {
    handleUserTypeSelect(type, (nextStep: any) => {
      setTimeout(() => {
        animateStepTransition(nextStep, () => {});
      }, 100);
    });
  };

  const onComplete = async () => {
    await handleNext(
      (step: any) => {
        animateStepTransition(step, () => {});
        startCelebrationAnimation();
      },
      () => {
        console.log('Validation failed');
      }
    );
  };

  const onBack = () => {
    handleBack((step: any) => {
      animateStepTransition(step, () => {});
    });
  };

  const onStart = () => {
    handleStart();
  };

  const errorMessages = useMemo(() => {
    const currentStepErrors = methods.formState.errors;
    if (!currentStepErrors) return [];

    const stepKey = getCurrentStepKey();
    if (!stepKey) return [];

    const stepErrors = currentStepErrors[stepKey] as
      | Record<string, FieldError>
      | undefined;
    if (!stepErrors || typeof stepErrors !== 'object') return [];

    return Object.values(stepErrors)
      .map((error) => error?.message || '')
      .filter(Boolean);
  }, [methods.formState.errors, getCurrentStepKey]);

  if (process.env.NODE_ENV !== 'production' && errorMessages.length > 0) {
    console.log('Current step errors:', errorMessages);
  }

  return (
    <Fragment>
      <FormProvider {...methods}>
        <View className="flex-1 bg-slate-50">
          {currentStep !== 'complete' && (
            <ProgressHeader
              stepProgress={getStepProgress()}
              animatedProgressStyle={animatedProgressStyle}
            />
          )}

          {currentStep !== 'complete' && (
            <Animated.View style={animatedContentStyle} className="flex-1">
              {currentStep === 'user-type' && (
                <UserTypeSelection onUserTypeSelect={onUserTypeSelect} />
              )}
              {currentStep === 'professional-info' && (
                <ProfessionalInfo onComplete={onComplete} onBack={onBack} />
              )}
              {currentStep === 'client-info' && (
                <ClientInfo onComplete={onComplete} onBack={onBack} />
              )}
            </Animated.View>
          )}

          {currentStep === 'complete' && (
            <CompletionScreen
              userType={userType}
              celebrationStyle={celebrationStyle}
              onStart={onStart}
            />
          )}
        </View>
      </FormProvider>
    </Fragment>
  );
}
