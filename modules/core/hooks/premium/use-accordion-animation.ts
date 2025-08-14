import { useEffect } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';

export const useAccordionAnimation = (isOpen: boolean) => {
  const chevronAnimation = useSharedValue(isOpen ? 1 : 0);
  const contentAnimation = useSharedValue(isOpen ? 1 : 0);

  useEffect(() => {
    const animationConfig = { duration: 350 };
    chevronAnimation.value = withTiming(isOpen ? 1 : 0, animationConfig);
    contentAnimation.value = withTiming(isOpen ? 1 : 0, animationConfig);
  }, [isOpen, chevronAnimation, contentAnimation]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(chevronAnimation.value, [0, 1], [0, 90], Extrapolation.CLAMP)}deg`
      }
    ]
  }));

  const contentStyle = useAnimatedStyle(() => {
    const height = interpolate(
      contentAnimation.value,
      [0, 1],
      [0, 100],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      contentAnimation.value,
      [0, 0.2, 1],
      [0, 0.3, 1],
      Extrapolation.CLAMP
    );
    const scale = interpolate(
      contentAnimation.value,
      [0, 1],
      [0.95, 1],
      Extrapolation.CLAMP
    );

    return {
      height,
      opacity,
      transform: [{ scaleY: scale }],
      overflow: 'hidden'
    };
  });

  return { chevronStyle, contentStyle };
};
