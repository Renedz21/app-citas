/**
 * Types Index - Central export for all TypeScript types
 * This file exports all types for easy importing throughout the application
 */

// Database types
export * from './database';

// Entity types
export * from './profile.types';
export * from './service.types';

// Main entity types with specific exports to avoid conflicts
export type {
  // Client types
  Client,
  CreateClientData,
  UpdateClientData,
  ClientWithDetails,
  ClientSummary,
  ClientFilters,
  ClientStats,
  ClientStatus,
  Gender,
  ClientResponse,
  ClientListResponse,
  ClientStatsResponse
} from './client.types';

export type {
  // Appointment types
  Appointment,
  AppointmentWithDetails,
  CreateAppointmentData,
  UpdateAppointmentData,
  AppointmentSummary,
  AppointmentFilters,
  AppointmentStats,
  AppointmentStatus,
  AppointmentStatusDisplay,
  DaySchedule,
  WeekSchedule,
  TimeSlot,
  AppointmentResponse,
  AppointmentListResponse,
  AppointmentStatsResponse
} from './appointment.types';

export * from './payment.types';
export * from './subscription.types';

// Legacy types (for backward compatibility) - with aliases to avoid conflicts
export type {
  Client as LegacyClient,
  Appointment as LegacyAppointment
} from './dummy-data.type';

// Common utility types
export interface ApiResponse<T = any> {
  data: T | null;
  error: string | null;
  message?: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  count: number;
  total_count: number;
  page: number;
  per_page: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
  error: string | null;
}

export interface FilterOptions {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
  search?: string;
}

export interface DateRange {
  start_date: string;
  end_date: string;
}

export interface TimeRange {
  start_time: string; // HH:MM format
  end_time: string; // HH:MM format
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  coordinates?: Coordinates;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: Address;
}

// Form types
export interface FormField<T = any> {
  name: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'tel'
    | 'number'
    | 'date'
    | 'time'
    | 'datetime'
    | 'select'
    | 'multiselect'
    | 'textarea'
    | 'checkbox'
    | 'radio';
  value: T;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { label: string; value: any }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    custom?: (value: T) => boolean | string;
  };
}

export interface FormState {
  fields: FormField[];
  isValid: boolean;
  isSubmitting: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  route: string;
  badge?: number | string;
  children?: NavigationItem[];
}

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  component: React.ComponentType;
  badge?: number | string;
}

// Notification types
export interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    handler: () => void;
  };
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ThemeFonts {
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  fonts: ThemeFonts;
  borderRadius: number;
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  user_id?: string;
  session_id?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  loadingMessage?: string;
  progress?: number; // 0-100
}

export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

// Cache types
export interface CacheEntry<T = any> {
  data: T;
  timestamp: string;
  ttl: number; // Time to live in milliseconds
  key: string;
}

export interface CacheOptions {
  ttl?: number;
  maxSize?: number;
  strategy?: 'lru' | 'fifo' | 'lfu';
}

// Analytics types
export interface AnalyticsEvent {
  name: string;
  properties: Record<string, any>;
  timestamp: string;
  user_id?: string;
  session_id: string;
}

export interface AnalyticsMetric {
  name: string;
  value: number;
  unit?: string;
  timestamp: string;
  dimensions?: Record<string, string>;
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

export interface MutationConfig<TData = any, TVariables = any> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: any, variables: TVariables) => void;
  onSettled?: (
    data: TData | undefined,
    error: any,
    variables: TVariables
  ) => void;
}

// Re-export commonly used types from database (avoiding duplicates)
export type {
  Tables as DatabaseTables,
  TablesInsert as DatabaseTablesInsert,
  TablesUpdate as DatabaseTablesUpdate
} from './database';
