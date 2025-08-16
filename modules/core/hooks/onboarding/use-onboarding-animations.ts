import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence
} from 'react-native-reanimated';

type OnboardingStep =
  | 'user-type'
  | 'professional-info'
  | 'client-info'
  | 'complete';

export const useOnboardingAnimations = () => {
  const progressWidth = useSharedValue(33.33);
  const contentOpacity = useSharedValue(1);
  const contentTranslateX = useSharedValue(0);
  const celebrationScale = useSharedValue(0);

  const animateStepTransition = (
    newStep: OnboardingStep,
    onStepChange: (step: OnboardingStep) => void
  ) => {
    // Slide out current content
    contentOpacity.value = withTiming(0, { duration: 200 });
    contentTranslateX.value = withTiming(-50, { duration: 200 });

    // Update progress bar
    const stepProgress =
      newStep === 'user-type'
        ? 33.33
        : newStep === 'professional-info' || newStep === 'client-info'
          ? 66.66
          : 100;
    progressWidth.value = withSpring(stepProgress, {
      damping: 15,
      stiffness: 100
    });

    // After slide out, change step and slide in
    setTimeout(() => {
      onStepChange(newStep);
      contentTranslateX.value = 50;
      contentOpacity.value = withTiming(1, { duration: 300 });
      contentTranslateX.value = withSpring(0, {
        damping: 20,
        stiffness: 100
      });
    }, 200);
  };

  const startCelebrationAnimation = () => {
    setTimeout(() => {
      celebrationScale.value = withSequence(
        withSpring(1.2, { damping: 8, stiffness: 100 }),
        withSpring(1, { damping: 12, stiffness: 100 })
      );
    }, 300);
  };

  const animatedContentStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
      transform: [{ translateX: contentTranslateX.value }]
    };
  });

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`
    };
  });

  const celebrationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: celebrationScale.value }]
    };
  });

  return {
    animateStepTransition,
    startCelebrationAnimation,
    animatedContentStyle,
    animatedProgressStyle,
    celebrationStyle
  };
};
