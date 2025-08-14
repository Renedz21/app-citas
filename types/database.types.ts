// =============================================================================
// DATABASE TYPES - Optimized TypeScript types for Supabase
// =============================================================================

// Base utility types
export type UUID = string;
export type ISODateString = Date;
export type Decimal = number;

// =============================================================================
// ENUMS - Extracted from database constraints
// =============================================================================

export const PROFILE_TYPE = {
  CLIENT: 'Cliente',
  PROFESSIONAL: 'Profesional'
} as const;
export type ProfileType = (typeof PROFILE_TYPE)[keyof typeof PROFILE_TYPE];

export const GENDER = {
  MALE: 'Masculino',
  FEMALE: 'Femenino',
  NON_BINARY: 'No binario',
  PREFER_NOT_TO_SAY: 'Prefiero no decir'
} as const;
export type Gender = (typeof GENDER)[keyof typeof GENDER];

export const CLIENT_STATUS = {
  ACTIVE: 'Activo',
  NEW: 'Nuevo',
  INACTIVE: 'Inactivo'
} as const;
export type ClientStatus = (typeof CLIENT_STATUS)[keyof typeof CLIENT_STATUS];

export const APPOINTMENT_STATUS = {
  CONFIRMED: 'Confirmada',
  PENDING: 'Pendiente',
  CANCELLED: 'Cancelada',
  COMPLETED: 'Completada'
} as const;
export type AppointmentStatus =
  (typeof APPOINTMENT_STATUS)[keyof typeof APPOINTMENT_STATUS];

export const PAYMENT_STATUS = {
  PENDING: 'Pendiente',
  PAID: 'Pagado',
  REFUNDED: 'Reembolsado'
} as const;
export type PaymentStatus =
  (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const RELATIONSHIP_TYPE = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo'
} as const;
export type RelationshipType =
  (typeof RELATIONSHIP_TYPE)[keyof typeof RELATIONSHIP_TYPE];

// =============================================================================
// CORE ENTITY TYPES
// =============================================================================

// Profile Types
export interface Profile {
  id: UUID;
  clerk_id: string | null;
  first_name: string;
  last_name: string;
  profile_type: ProfileType;
  business_name: string | null;
  profession: string | null;
  phone: string | null;
  email: string | null;
  is_active: boolean | null;
  created_at: ISODateString | null;
  updated_at: ISODateString | null;
}

export interface CreateProfileData {
  clerk_id?: string | null;
  first_name: string;
  last_name: string;
  profile_type?: ProfileType;
  business_name?: string | null;
  profession?: string | null;
  phone?: string | null;
  email?: string | null;
  is_active?: boolean | null;
}

export interface UpdateProfileData {
  clerk_id?: string | null;
  first_name?: string;
  last_name?: string;
  profile_type?: ProfileType;
  business_name?: string | null;
  profession?: string | null;
  phone?: string | null;
  email?: string | null;
  is_active?: boolean | null;
  updated_at?: ISODateString | null;
}

// Client Types
export interface Client {
  id: UUID;
  age: number | null;
  gender: Gender | null;
  status: ClientStatus | null;
  total_visits: number | null;
  total_spent: Decimal | null;
  last_visit_date: ISODateString | null;
  next_appointment_date: ISODateString | null;
  created_at: ISODateString | null;
  updated_at: ISODateString | null;
}

export interface CreateClientData {
  id: UUID; // Must match profile ID
  age?: number | null;
  gender?: Gender | null;
  status?: ClientStatus | null;
  total_visits?: number | null;
  total_spent?: Decimal | null;
  last_visit_date?: ISODateString | null;
  next_appointment_date?: ISODateString | null;
}

export interface UpdateClientData {
  age?: number | null;
  gender?: Gender | null;
  status?: ClientStatus | null;
  total_visits?: number | null;
  total_spent?: Decimal | null;
  last_visit_date?: ISODateString | null;
  next_appointment_date?: ISODateString | null;
  updated_at?: ISODateString | null;
}

// Service Category Types
export interface ServiceCategory {
  id: UUID;
  name: string;
  description: string | null;
  is_active: boolean | null;
  created_at: ISODateString | null;
}

export interface CreateServiceCategoryData {
  name: string;
  description?: string | null;
  is_active?: boolean | null;
}

export interface UpdateServiceCategoryData {
  name?: string;
  description?: string | null;
  is_active?: boolean | null;
}

// Service Types
export interface Service {
  id: UUID;
  category_id: UUID;
  name: string;
  description: string | null;
  default_duration_minutes: number | null;
  suggested_price: Decimal | null;
  is_active: boolean | null;
  created_at: ISODateString | null;
}

export interface CreateServiceData {
  category_id: UUID;
  name: string;
  description?: string | null;
  default_duration_minutes?: number | null;
  suggested_price?: Decimal | null;
  is_active?: boolean | null;
}

export interface UpdateServiceData {
  category_id?: UUID;
  name?: string;
  description?: string | null;
  default_duration_minutes?: number | null;
  suggested_price?: Decimal | null;
  is_active?: boolean | null;
}

// Professional Service Types
export interface ProfessionalService {
  id: UUID;
  professional_id: UUID;
  service_id: UUID;
  custom_name: string | null;
  custom_price: Decimal;
  custom_duration_minutes: number;
  is_active: boolean | null;
  created_at: ISODateString | null;
}

export interface CreateProfessionalServiceData {
  professional_id: UUID;
  service_id: UUID;
  custom_name?: string | null;
  custom_price: Decimal;
  custom_duration_minutes: number;
  is_active?: boolean | null;
}

export interface UpdateProfessionalServiceData {
  professional_id?: UUID;
  service_id?: UUID;
  custom_name?: string | null;
  custom_price?: Decimal;
  custom_duration_minutes?: number;
  is_active?: boolean | null;
}

// Appointment Types
export interface Appointment {
  id: UUID;
  appointment_code: string;
  client_id: UUID;
  professional_id: UUID;
  professional_service_id: UUID;
  status: AppointmentStatus | null;
  appointment_date: ISODateString;
  duration_minutes: number;
  location_name: string | null;
  location_address: string | null;
  consultation_fee: Decimal;
  created_at: ISODateString | null;
  updated_at: ISODateString | null;
}

export interface CreateAppointmentData {
  appointment_code: string;
  client_id: UUID;
  professional_id: UUID;
  professional_service_id: UUID;
  status?: AppointmentStatus | null;
  appointment_date: ISODateString;
  duration_minutes: number;
  location_name?: string | null;
  location_address?: string | null;
  consultation_fee: Decimal;
}

export interface UpdateAppointmentData {
  appointment_code?: string;
  client_id?: UUID;
  professional_id?: UUID;
  professional_service_id?: UUID;
  status?: AppointmentStatus | null;
  appointment_date?: ISODateString;
  duration_minutes?: number;
  location_name?: string | null;
  location_address?: string | null;
  consultation_fee?: Decimal;
  updated_at?: ISODateString | null;
}

// Payment Method Types
export interface PaymentMethod {
  id: UUID;
  client_id: UUID;
  method_type: string;
  card_last_four: string | null;
  card_brand: string | null;
  is_default: boolean | null;
  created_at: ISODateString | null;
}

export interface CreatePaymentMethodData {
  client_id: UUID;
  method_type: string;
  card_last_four?: string | null;
  card_brand?: string | null;
  is_default?: boolean | null;
}

export interface UpdatePaymentMethodData {
  client_id?: UUID;
  method_type?: string;
  card_last_four?: string | null;
  card_brand?: string | null;
  is_default?: boolean | null;
}

// Payment Types
export interface Payment {
  id: UUID;
  appointment_id: UUID;
  client_id: UUID;
  payment_method_id: UUID | null;
  amount: Decimal;
  status: PaymentStatus | null;
  authorization_code: string | null;
  transaction_date: ISODateString | null;
  created_at: ISODateString | null;
}

export interface CreatePaymentData {
  appointment_id: UUID;
  client_id: UUID;
  payment_method_id?: UUID | null;
  amount: Decimal;
  status?: PaymentStatus | null;
  authorization_code?: string | null;
  transaction_date?: ISODateString | null;
}

export interface UpdatePaymentData {
  appointment_id?: UUID;
  client_id?: UUID;
  payment_method_id?: UUID | null;
  amount?: Decimal;
  status?: PaymentStatus | null;
  authorization_code?: string | null;
  transaction_date?: ISODateString | null;
}

// Client Info Types
export interface ClientInfo {
  id: UUID;
  client_id: UUID;
  allergies: string | null;
  special_notes: string | null;
  health_notes: string | null;
  diagnosis: string | null;
  created_at: ISODateString | null;
  updated_at: ISODateString | null;
}

export interface CreateClientInfoData {
  client_id: UUID;
  allergies?: string | null;
  special_notes?: string | null;
  health_notes?: string | null;
  diagnosis?: string | null;
}

export interface UpdateClientInfoData {
  client_id?: UUID;
  allergies?: string | null;
  special_notes?: string | null;
  health_notes?: string | null;
  diagnosis?: string | null;
  updated_at?: ISODateString | null;
}

// Client Preferences Types
export interface ClientPreferences {
  id: UUID;
  client_id: UUID;
  preferred_schedule: string | null;
  communication_method: string | null;
  reminder_hours: number | null;
  payment_method_id: UUID | null;
  created_at: ISODateString | null;
  updated_at: ISODateString | null;
}

export interface CreateClientPreferencesData {
  client_id: UUID;
  preferred_schedule?: string | null;
  communication_method?: string | null;
  reminder_hours?: number | null;
  payment_method_id?: UUID | null;
}

export interface UpdateClientPreferencesData {
  client_id?: UUID;
  preferred_schedule?: string | null;
  communication_method?: string | null;
  reminder_hours?: number | null;
  payment_method_id?: UUID | null;
  updated_at?: ISODateString | null;
}

// Client Professional Relationship Types
export interface ClientProfessionalRelationship {
  id: UUID;
  client_id: UUID;
  professional_id: UUID;
  relationship_type: RelationshipType | null;
  first_appointment_date: ISODateString | null;
  last_appointment_date: ISODateString | null;
  created_at: ISODateString | null;
  updated_at: ISODateString | null;
}

export interface CreateClientProfessionalRelationshipData {
  client_id: UUID;
  professional_id: UUID;
  relationship_type?: RelationshipType | null;
  first_appointment_date?: ISODateString | null;
  last_appointment_date?: ISODateString | null;
}

export interface UpdateClientProfessionalRelationshipData {
  client_id?: UUID;
  professional_id?: UUID;
  relationship_type?: RelationshipType | null;
  first_appointment_date?: ISODateString | null;
  last_appointment_date?: ISODateString | null;
  updated_at?: ISODateString | null;
}

// Session Notes Types
export interface SessionNote {
  id: UUID;
  appointment_id: UUID;
  client_id: UUID;
  professional_id: UUID;
  note_date: ISODateString;
  content: string;
  created_at: ISODateString | null;
  updated_at: ISODateString | null;
}

export interface CreateSessionNoteData {
  appointment_id: UUID;
  client_id: UUID;
  professional_id: UUID;
  note_date: ISODateString;
  content: string;
}

export interface UpdateSessionNoteData {
  appointment_id?: UUID;
  client_id?: UUID;
  professional_id?: UUID;
  note_date?: ISODateString;
  content?: string;
  updated_at?: ISODateString | null;
}

// =============================================================================
// COMPOSED TYPES - For complex queries and relationships
// =============================================================================

// Full Client Profile (Profile + Client data)
export interface ClientProfile extends Profile {
  client_data: Client;
  client_info?: ClientInfo;
  preferences?: ClientPreferences;
}

// Full Professional Profile
export interface ProfessionalProfile extends Profile {
  services: ProfessionalService[];
}

// Appointment with related data
export interface AppointmentWithDetails extends Appointment {
  client: ClientProfile;
  professional: ProfessionalProfile;
  service: ProfessionalService & { base_service: Service };
  payment?: Payment;
  session_notes?: SessionNote[];
}

// Service with category
export interface ServiceWithCategory extends Service {
  category: ServiceCategory;
}

// Professional Service with base service and category
export interface ProfessionalServiceWithDetails extends ProfessionalService {
  service: ServiceWithCategory;
  professional: Profile;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

// Generic API Response wrapper
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Filter types for common queries
export interface AppointmentFilters {
  status?: AppointmentStatus;
  client_id?: UUID;
  professional_id?: UUID;
  date_from?: ISODateString;
  date_to?: ISODateString;
}

export interface ClientFilters {
  status?: ClientStatus;
  gender?: Gender;
  professional_id?: UUID;
  age_min?: number;
  age_max?: number;
}

// Table name constants for type safety
export const TABLE_NAMES = {
  PROFILES: 'profiles',
  CLIENTS: 'clients',
  APPOINTMENTS: 'appointments',
  SERVICES: 'services',
  SERVICE_CATEGORIES: 'service_categories',
  PROFESSIONAL_SERVICES: 'professional_services',
  PAYMENTS: 'payments',
  PAYMENT_METHODS: 'payment_methods',
  CLIENT_INFO: 'client_info',
  CLIENT_PREFERENCES: 'client_preferences',
  CLIENT_PROFESSIONAL_RELATIONSHIPS: 'client_professional_relationships',
  SESSION_NOTES: 'session_notes'
} as const;

export type TableName = (typeof TABLE_NAMES)[keyof typeof TABLE_NAMES];

// =============================================================================
// END OF DATABASE TYPES
// =============================================================================
