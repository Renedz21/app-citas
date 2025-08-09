import {
  signupSchema,
  type SignUpSchema,
} from "@/modules/core/schemas/auth.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";

export function useSignUp() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignUpSchema) => {
    console.log(data);
  };
  return { form: form as UseFormReturn<SignUpSchema>, onSubmit };
}
