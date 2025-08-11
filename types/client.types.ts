/**
 * Client Types - Patient/Customer Management
 * Represents patients, customers, or clients of professional services
 */

import { Database } from './database';

// Base types from database
export type ClientRow = Database['public']['Tables']['clients']['Row'];
export type ClientInsert = Database['public']['Tables']['clients']['Insert'];
export type ClientUpdate = Database['public']['Tables']['clients']['Update'];

// Client status enum for better type safety
export type ClientStatus = 'Activo' | 'Inactivo' | 'Nuevo';

// Gender options
export type Gender = 'Masculino' | 'Femenino' | 'Otro' | 'Prefiero no decir';

// Enhanced Client interface for application use
export interface Client {
  id: string;
  profile_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  age: number | null;
  gender: Gender | null;
  last_visit: string | null;
  next_appointment: string | null;
  total_sessions: number;
  status: ClientStatus;
  notes: string | null;
  diagnosis: string | null;
  created_at: string;
}

// Client creation data (for new client registration)
export interface CreateClientData {
  name: string;
  email?: string;
  phone?: string;
  age?: number;
  gender?: Gender;
  notes?: string;
  diagnosis?: string;
  status?: ClientStatus;
}

// Client update data (for editing client information)
export interface UpdateClientData {
  name?: string;
  email?: string;
  phone?: string;
  age?: number;
  gender?: Gender;
  last_visit?: string;
  next_appointment?: string;
  total_sessions?: number;
  status?: ClientStatus;
  notes?: string;
  diagnosis?: string;
}

// Client with additional computed data for detailed view
export interface ClientWithDetails extends Client {
  upcoming_appointments: {
    id: string;
    starts_at: string;
    service: string;
    status: string;
  }[];
  recent_appointments: {
    id: string;
    starts_at: string;
    service: string;
    status: string;
    notes: string | null;
  }[];
  payment_history: {
    id: string;
    amount_cents: number;
    currency: string;
    method: string;
    status: string;
    paid_at: string | null;
    created_at: string;
  }[];
  total_paid: number;
  total_pending: number;
}

// Client summary for dashboard/overview
export interface ClientSummary {
  id: string;
  name: string;
  status: ClientStatus;
  last_visit: string | null;
  next_appointment: string | null;
  total_sessions: number;
  phone: string | null;
  avatar?: string; // For displaying initials or profile picture
}

// Client filters for search and filtering
export interface ClientFilters {
  status?: ClientStatus | ClientStatus[];
  gender?: Gender;
  age_min?: number;
  age_max?: number;
  has_upcoming_appointment?: boolean;
  last_visit_after?: string;
  last_visit_before?: string;
  search?: string; // Search in name, email, phone, diagnosis
  sort_by?: 'name' | 'last_visit' | 'total_sessions' | 'created_at';
  sort_order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Client statistics for reporting
export interface ClientStats {
  total_clients: number;
  active_clients: number;
  inactive_clients: number;
  new_clients: number;
  clients_with_upcoming_appointments: number;
  average_sessions_per_client: number;
  age_distribution: {
    '0-18': number;
    '19-30': number;
    '31-45': number;
    '46-60': number;
    '60+': number;
  };
  gender_distribution: {
    masculino: number;
    femenino: number;
    otro: number;
    no_especificado: number;
  };
}

// Client preferences and settings
export interface ClientPreferences {
  preferred_appointment_time?: 'morning' | 'afternoon' | 'evening';
  communication_method?: 'email' | 'sms' | 'phone' | 'whatsapp';
  reminder_time?: number; // hours before appointment
  language?: 'es' | 'en';
  notes?: string;
}

// Emergency contact information
export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

// Extended client profile with additional information
export interface ExtendedClientProfile extends Client {
  preferences: ClientPreferences;
  emergency_contact: EmergencyContact | null;
  medical_history?: string;
  allergies?: string[];
  medications?: string[];
  insurance_info?: {
    provider: string;
    policy_number: string;
    group_number?: string;
  };
}

// Response types for API calls
export interface ClientResponse {
  data: Client | null;
  error: string | null;
}

export interface ClientListResponse {
  data: Client[];
  count: number;
  error: string | null;
}

export interface ClientStatsResponse {
  data: ClientStats;
  error: string | null;
}
