import { supabase } from '@/lib/supabase';
import type {
  AppointmentWithDetails,
  CreateAppointmentData,
  AppointmentFilters
} from '@/types/entities';

export async function getAppointments(
  filters?: AppointmentFilters
): Promise<AppointmentWithDetails[]> {
  let query = supabase.from('appointments').select(`
    *,
    client:clients(
      *,
      profiles!inner(
        id,
        first_name,
        last_name,
        email,
        phone,
        profile_type
      )
    ),
    professional:profiles!appointments_professional_id_fkey(
      id,
      first_name,
      last_name,
      email,
      phone,
      business_name,
      profession,
      specialization
    ),
    professional_service:professional_services(
      id,
      custom_name,
      custom_price,
      custom_duration_minutes,
      service:services(
        id,
        name,
        description,
        category:service_categories(id,name,description)
      )
    ),
    session_notes(*),
    payments(*)
  `);

  // Apply filters
  if (filters) {
    const {
      status,
      client_id,
      professional_id,
      date_from,
      date_to,
      limit,
      sort_by,
      sort_order
    } = filters;

    if (status) {
      query = Array.isArray(status)
        ? query.in('status', status)
        : query.eq('status', status);
    }
    if (client_id) {
      query = query.eq('client_id', client_id);
    }
    if (professional_id) {
      query = query.eq('professional_id', professional_id);
    }
    if (date_from) {
      query = query.gte('appointment_date', date_from);
    }
    if (date_to) {
      query = query.lte('appointment_date', date_to);
    }
    if (limit) {
      query = query.limit(limit);
    }
    if (sort_by) {
      query = query.order(sort_by, { ascending: sort_order === 'asc' });
    }
  }

  const { data, error } = await query;
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
      client:clients(
        *,
        profiles!inner(
          id,
          first_name,
          last_name,
          email,
          phone,
          profile_type
        )
      ),
      professional:profiles!appointments_professional_id_fkey(
        id,
        first_name,
        last_name,
        email,
        phone,
        business_name,
        profession,
        specialization
      ),
      professional_service:professional_services(
        id,
        custom_name,
        custom_price,
        custom_duration_minutes,
        service:services(
          id,
          name,
          description,
          category:service_categories(id,name,description)
        )
      ),
      session_notes(*),
      payments(*)
    `
    )
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data as AppointmentWithDetails | null;
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
      client:clients(
        *,
        profiles!inner(
          id,
          first_name,
          last_name,
          email,
          phone,
          profile_type
        )
      ),
      professional:profiles!appointments_professional_id_fkey(
        id,
        first_name,
        last_name,
        email,
        phone,
        business_name,
        profession,
        specialization
      ),
      professional_service:professional_services(
        id,
        custom_name,
        custom_price,
        custom_duration_minutes,
        service:services(
          id,
          name,
          description,
          category:service_categories(id,name,description)
        )
      )
    `
    )
    .single();
  if (error) throw error;
  return data as AppointmentWithDetails;
}
