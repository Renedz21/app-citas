import { supabase } from '@/lib/supabase';
import type { FullClient, ClientFilters } from '@/types/entities';

export async function getClients(
  filters?: ClientFilters
): Promise<FullClient[]> {
  let query = supabase.from('clients').select(`
    *,
    profiles!inner(
      id,
      first_name,
      last_name,
      email,
      phone,
      profile_type,
      created_at,
      updated_at
    )
  `);
  // Apply filters to the Supabase query in a concise, readable way
  if (filters) {
    const {
      limit,
      status,
      gender,
      age_min,
      age_max,
      search,
      sort_by,
      sort_order
    } = filters;

    if (typeof limit === 'number') {
      query = query.limit(limit);
    }
    if (status) {
      query = Array.isArray(status)
        ? query.in('status', status)
        : query.eq('status', status);
    }
    if (gender) {
      query = query.eq('gender', gender);
    }
    if (typeof age_min === 'number') {
      query = query.gte('age', age_min);
    }
    if (typeof age_max === 'number') {
      query = query.lte('age', age_max);
    }
    if (search) {
      // Search in profile fields
      query = query.or(
        [
          `profiles.first_name.ilike.%${search}%`,
          `profiles.last_name.ilike.%${search}%`,
          `profiles.email.ilike.%${search}%`,
          `profiles.phone.ilike.%${search}%`
        ].join(',')
      );
    }
    if (sort_by) {
      query = query.order(sort_by, {
        ascending: sort_order === 'asc'
      });
    }
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as FullClient[];
}

export async function getClientById(id: string): Promise<FullClient> {
  const { data, error } = await supabase
    .from('clients')
    .select(
      `
      *,
      profiles!inner(
        id,
        first_name,
        last_name,
        email,
        phone,
        profile_type,
        business_name,
        profession,
        specialization,
        title,
        created_at,
        updated_at
      ),
      client_info(*),
      client_preferences(*),
      appointments(
        id,
        appointment_code,
        appointment_date,
        start_time,
        duration_minutes,
        status,
        notes,
        consultation_fee
      ),
      payments(
        id,
        amount,
        status,
        transaction_date,
        created_at
      )
    `
    )
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data as FullClient;
}
