import { supabase } from '@/lib/supabase';
import { AppointmentWithDetails, CreateAppointmentData } from '@/types';

export async function getAppointments(): Promise<AppointmentWithDetails[]> {
  const { data, error } = await supabase.from('appointments').select(`
    *,
    client:clients(id,name,phone,email,age),
    user_service:user_services(
      id,
      custom_name,
      custom_description,
      price_cents,
      currency,
      duration_minutes,
      service:services(
        id,
        name,
        description,
        category:service_categories(id,name,color)
      )
    )
    `);
  if (error) throw error;
  return data as AppointmentWithDetails[];
}

export async function getAppointmentById(
  id: string
): Promise<AppointmentWithDetails | null> {
  const { data, error } = await supabase
    .from('appointments')
    .select(
      `
     *,
     client:clients(id,name,phone,email,age),
     user_service:user_services(
       id,
       custom_name,
       custom_description,
       price_cents,
       currency,
       duration_minutes,
       service:services(
         id,
         name,
         description,
         category:service_categories(id,name,color)
       )
     )
    `
    )
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data as unknown as AppointmentWithDetails | null;
}

export async function createAppointment(
  appointment: CreateAppointmentData
): Promise<AppointmentWithDetails> {
  const { data, error } = await supabase
    .from('appointments')
    .insert(appointment)
    .select(
      `
     *,
     client:clients(id,name,phone,email,age),
     user_service:user_services(
       id,
       custom_name,
       custom_description,
       price_cents,
       currency,
       duration_minutes,
       service:services(
         id,
         name,
         description,
         category:service_categories(id,name,color)
       )
     )
    `
    )
    .single();
  if (error) throw error;
  return data as unknown as AppointmentWithDetails;
}
