import { TextInput, TextInputProps } from 'react-native';

import { cn } from '@/lib/utils';

type InputProps = TextInputProps & {
  ref?: any;
};

const Input = ({ className, keyboardType, ref, ...props }: InputProps) => {
  return (
    <TextInput
      ref={ref}
      keyboardType={keyboardType}
      className={cn(
        'flex-row rounded-2xl border border-border bg-white p-4 text-base placeholder:text-foreground disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
};

export { Input };
