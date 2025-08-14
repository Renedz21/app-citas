import React, { useState, ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
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
    animationProgress.value = withTiming(isOpen ? 1 : 0, {
      duration: 300
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
        <View className={cn('px-4 pb-4', contentClassName)}>{children}</View>
      )}
    </View>
  );
}
