import React, { useState, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';
import ChevronDownIcon from '@/assets/icons/chevron-right.svg';
import { cn } from '@/lib/utils';

interface AccordionProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
  showChevron?: boolean;
}

export function Accordion({
  title,
  children,
  isOpen: controlledIsOpen,
  onToggle,
  className = '',
  titleClassName = '',
  contentClassName = '',
  showChevron = true
}: AccordionProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const animationProgress = useSharedValue(0);

  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  // Update animation when isOpen changes
  React.useEffect(() => {
    animationProgress.value = withSpring(isOpen ? 1 : 0, {
      damping: 20,
      stiffness: 300,
      mass: 1
    });
  }, [isOpen, animationProgress]);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  // Animated styles for chevron rotation
  const chevronAnimatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      animationProgress.value,
      [0, 1],
      [0, 90],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ rotate: `${rotation}deg` }]
    };
  });

  // Animated styles for content
  const contentAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationProgress.value,
      [0, 0.3, 1],
      [0, 0.5, 1],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      animationProgress.value,
      [0, 1],
      [0.95, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ scaleY: scale }]
    };
  });

  return (
    <View className={cn(className)}>
      <TouchableOpacity
        className={cn(
          'flex-row items-center justify-between p-4',
          titleClassName
        )}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <Text className="flex-1 font-medium text-base text-slate-900">
          {title}
        </Text>
        {showChevron && (
          <Animated.View style={chevronAnimatedStyle}>
            <ChevronDownIcon width={20} height={20} color="#64748B" />
          </Animated.View>
        )}
      </TouchableOpacity>

      {isOpen && (
        <Animated.View
          style={contentAnimatedStyle}
          className={cn('px-4 pb-4', contentClassName)}
        >
          {children}
        </Animated.View>
      )}
    </View>
  );
}
