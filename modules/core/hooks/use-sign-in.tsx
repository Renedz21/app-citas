import {
  loginSchema,
  type LoginSchema
} from '@/modules/core/schemas/auth.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { useSignUp } from '@/modules/core/hooks/use-sign-up';

export type AuthHookReturn = {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
};

export function useSignIn() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
  };
  return { form: form as UseFormReturn<LoginSchema>, onSubmit };
}

// Test suite expects a unified hook exported from this module.
// Provide a thin wrapper that delegates to the correct hook.
export function useAuth(type: 'login' | 'signup'): AuthHookReturn {
  const hook = type === 'login' ? useSignIn() : useSignUp();
  return hook as unknown as AuthHookReturn;
}
