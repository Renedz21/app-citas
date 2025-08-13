import { View, Text, type ViewProps } from 'react-native';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'flex-row items-center rounded-full px-2 py-1 border',
  {
    variants: {
      variant: {
        default: 'bg-slate-100 border-slate-400',
        pending: 'bg-amber-100/50 border-amber-400',
        cancelled: 'bg-destructive/15 border-destructive',
        completed: 'bg-green-100 border-green-400'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

type BadgeProps = VariantProps<typeof badgeVariants> & ViewProps;

export function Badge({ variant, className, children, ...props }: BadgeProps) {
  return (
    <View className={cn(badgeVariants({ variant, className }))} {...props}>
      <Text
        className={cn('text-xs font-medium', {
          'text-slate-800': variant === 'default' || !variant,
          'text-amber-700': variant === 'pending',
          'text-destructive': variant === 'cancelled',
          'text-green-700': variant === 'completed'
        })}
      >
        {children}
      </Text>
    </View>
  );
}
