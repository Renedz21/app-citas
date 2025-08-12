import { supabase } from '@/lib/supabase';
import { Client, ClientFilters, ClientWithDetails } from '@/types';

export async function getClients(filters?: ClientFilters): Promise<Client[]> {
  let query = supabase.from('clients').select('*');
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
      // Search in name, email, or phone fields
      query = query.or(
        [
          `name.ilike.%${search}%`,
          `email.ilike.%${search}%`,
          `phone.ilike.%${search}%`
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
  return data as Client[];
}

export async function getClientById(id: string): Promise<ClientWithDetails> {
  const { data, error } = await supabase
    .from('clients')
    .select(
      `
      *,
      appointments:appointments(id,starts_at,ends_at,status,duration_minutes,notes),
      payment_history:payments(id,amount_cents,currency,method,status,paid_at,created_at)
      `
    )
    .eq('id', id)
    .single();

  if (error) {
    console.log({ error });
    throw error;
  }

  return data as ClientWithDetails;
}
