import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("El email no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const signupSchema = z.object({
  name: z.string("El nombre es requerido.").min(1, "El nombre es requerido."),
  email: z.email("El email no es válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type SignUpSchema = z.infer<typeof signupSchema>;
