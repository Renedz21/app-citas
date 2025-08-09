import {
  type LoginSchema,
  loginSchema,
  signupSchema,
  type SignUpSchema,
} from "@/modules/core/schemas/auth.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const useAuth = (type: "login" | "signup") => {
  const form = useForm<LoginSchema | SignUpSchema>({
    resolver: zodResolver(type === "login" ? loginSchema : signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema | SignUpSchema) => {
    console.log(data);
  };

  return { form, onSubmit };
};
