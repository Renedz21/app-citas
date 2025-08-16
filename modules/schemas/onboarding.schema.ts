import { z } from 'zod';

export type FormValues = {
  profileType: {
    profile_type: string;
  };
  professionalData: {
    profession: string;
    business_name: string;
    phone: string;
  };
  clientData: {
    age: number;
    gender: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
};

export const profileTypeSchema = z.object({
  profile_type: z.string().min(1, { message: 'El tipo de perfil es requerido' })
});

export const professionalDataSchema = z.object({
  profession: z.string().min(1, { message: 'La profesión es requerida' }),
  business_name: z
    .string()
    .min(1, { message: 'El nombre de la empresa es requerido' }),
  phone: z.string().min(1, { message: 'El teléfono es requerido' })
});

export const clientDataSchema = z.object({
  age: z.number().min(1, { message: 'La edad es requerida' }),
  gender: z.string().min(1, { message: 'El género es requerido' }),
  first_name: z.string().min(1, { message: 'El nombre es requerido' }),
  last_name: z.string().min(1, { message: 'El apellido es requerido' }),
  email: z.email({ message: 'El email no es válido' }),
  phone: z.string().min(1, { message: 'El teléfono es requerido' })
});

export const fullSchema = z.object({
  profileType: profileTypeSchema,
  professionalData: professionalDataSchema,
  clientData: clientDataSchema
});

export type FullSchema = z.infer<typeof fullSchema>;
export type StepKeys = keyof FormValues;
