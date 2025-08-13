/**
 * Application Entity Types
 * Enhanced types for business logic and UI components
 */

import type {
  Tables,
  TablesInsert,
  TablesUpdate,
  Gender,
  ClientStatus,
  AppointmentStatus,
  PaymentStatus
} from './database';

// =============================================================================
// PROFILE TYPES
// =============================================================================

export type Profile = Tables<'profiles'>;

export interface ProfessionalProfile extends Profile {
  profile_type: 'professional';
  business_name: string;
  profession: string;
  specialization: string | null;
  title: string | null;
}

export interface ClientProfile extends Profile {
  profile_type: 'client';
  client_data: Tables<'clients'>;
  client_info?: Tables<'client_info'>;
  preferences?: Tables<'client_preferences'>;
}

export type CreateProfileData = TablesInsert<'profiles'>;
export type UpdateProfileData = TablesUpdate<'profiles'>;

// =============================================================================
// CLIENT TYPES
// =============================================================================

export type Client = Tables<'clients'>;
export type ClientInfo = Tables<'client_info'>;
export type ClientPreferences = Tables<'client_preferences'>;

export interface FullClient extends Client {
  profiles: Profile; // Campo anidado que contiene la información del perfil
  client_data: Client;
  client_info?: ClientInfo;
  preferences?: ClientPreferences;
}

export type CreateClientData = TablesInsert<'clients'>;
export type UpdateClientData = TablesUpdate<'clients'>;

// =============================================================================
// SERVICE TYPES
// =============================================================================

export type ServiceCategory = Tables<'service_categories'>;
export type Service = Tables<'services'>;
export type ProfessionalService = Tables<'professional_services'>;

export interface ServiceWithCategory extends Service {
  category: ServiceCategory;
}

export interface ProfessionalServiceWithDetails extends ProfessionalService {
  service: ServiceWithCategory;
  professional: ProfessionalProfile;
  display_name: string; // custom_name || service.name
  display_price: string; // formatted price
}

export type CreateServiceData = TablesInsert<'services'>;
export type CreateProfessionalServiceData =
  TablesInsert<'professional_services'>;

// =============================================================================
// APPOINTMENT TYPES
// =============================================================================

export type Appointment = Tables<'appointments'>;

export interface AppointmentWithDetails extends Appointment {
  client: FullClient;
  professional: ProfessionalProfile;
  professional_service: ProfessionalServiceWithDetails;
  session_notes?: SessionNote[];
  payment?: Payment;
}

export interface AppointmentSummary {
  id: string;
  appointment_code: string;
  client_name: string;
  professional_name: string;
  service_name: string;
  appointment_date: string;
  start_time: string;
  duration_minutes: number;
  status: AppointmentStatus;
  consultation_fee: number;
}

export type CreateAppointmentData = TablesInsert<'appointments'>;
export type UpdateAppointmentData = TablesUpdate<'appointments'>;

// =============================================================================
// PAYMENT TYPES
// =============================================================================

export type Payment = Tables<'payments'>;
export type PaymentMethod = Tables<'payment_methods'>;

export interface PaymentWithDetails extends Payment {
  client: ClientProfile;
  appointment: Appointment;
  payment_method?: PaymentMethod;
}

export type CreatePaymentData = TablesInsert<'payments'>;

// =============================================================================
// SESSION NOTES TYPES
// =============================================================================

export type SessionNote = Tables<'session_notes'>;

export interface SessionNoteWithDetails extends SessionNote {
  client: ClientProfile;
  professional: ProfessionalProfile;
  appointment: Appointment;
}

export type CreateSessionNoteData = TablesInsert<'session_notes'>;

// =============================================================================
// FILTER AND QUERY TYPES
// =============================================================================

export interface BaseFilters {
  limit?: number;
  offset?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface ClientFilters extends BaseFilters {
  status?: ClientStatus | ClientStatus[];
  gender?: Gender;
  age_min?: number;
  age_max?: number;
  search?: string;
  has_upcoming_appointments?: boolean;
}

export interface AppointmentFilters extends BaseFilters {
  status?: AppointmentStatus | AppointmentStatus[];
  client_id?: string;
  professional_id?: string;
  date_from?: string;
  date_to?: string;
  service_category_id?: string;
}

export interface PaymentFilters extends BaseFilters {
  status?: PaymentStatus | PaymentStatus[];
  client_id?: string;
  appointment_id?: string;
  amount_min?: number;
  amount_max?: number;
  date_from?: string;
  date_to?: string;
}

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  message?: string;
}

// Export helper types for React Query
export interface QueryConfig<T = any> {
  queryKey: (string | number | object)[];
  queryFn: () => Promise<T>;
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  retry?: boolean | number;
  retryDelay?: number;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  data: T[];
  count: number;
  total_count: number;
  has_next: boolean;
  has_prev: boolean;
}

// =============================================================================
// FORM AND VALIDATION TYPES
// =============================================================================

export interface FormField<T = any> {
  name: string;
  value: T;
  error?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

// =============================================================================
// BUSINESS LOGIC TYPES
// =============================================================================

export interface AppointmentSlot {
  date: string;
  start_time: string;
  end_time: string;
  available: boolean;
  appointment_id?: string;
}

export interface DaySchedule {
  date: string;
  appointments: AppointmentWithDetails[];
  available_slots: AppointmentSlot[];
  total_appointments: number;
  total_revenue: number;
}

export interface ClientStats {
  total_clients: number;
  active_clients: number;
  new_clients: number;
  inactive_clients: number;
  clients_by_gender: Record<Gender, number>;
  average_age: number;
  total_revenue: number;
}

export interface ProfessionalStats {
  total_appointments: number;
  completed_appointments: number;
  pending_appointments: number;
  total_revenue: number;
  total_clients: number;
  most_popular_service: string;
  average_session_duration: number;
}

// =============================================================================
// CONSTANTS AND ENUMS
// =============================================================================

export const PROFILE_TYPES = ['professional', 'client'] as const;
export const GENDERS = [
  'male',
  'female',
  'non_binary',
  'prefer_not_say'
] as const;
export const CLIENT_STATUSES = ['active', 'new', 'inactive'] as const;
export const APPOINTMENT_STATUSES = [
  'confirmed',
  'pending',
  'cancelled',
  'completed'
] as const;
export const PAYMENT_STATUSES = ['pending', 'paid', 'refunded'] as const;

export const GENDER_LABELS: Record<Gender, string> = {
  male: 'Masculino',
  female: 'Femenino',
  non_binary: 'No binario',
  prefer_not_say: 'Prefiero no decir'
};

export const CLIENT_STATUS_LABELS: Record<ClientStatus, string> = {
  active: 'Activo',
  new: 'Nuevo',
  inactive: 'Inactivo'
};

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  confirmed: 'Confirmada',
  pending: 'Pendiente',
  cancelled: 'Cancelada',
  completed: 'Completada'
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  refunded: 'Reembolsado'
};
