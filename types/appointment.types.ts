/**
 * Appointment Types - Appointment/Scheduling Management
 * Represents appointments, consultations, sessions, or bookings
 */

import { Database } from './database';

// Base types from database
export type AppointmentRow =
  Database['public']['Tables']['appointments']['Row'];
export type AppointmentInsert =
  Database['public']['Tables']['appointments']['Insert'];
export type AppointmentUpdate =
  Database['public']['Tables']['appointments']['Update'];

// Appointment status enum for better type safety
export type AppointmentStatus =
  | 'scheduled'
  | 'completed'
  | 'cancelled'
  | 'no_show';

// Appointment status in Spanish (for UI display)
export type AppointmentStatusDisplay =
  | 'Programada'
  | 'Confirmada'
  | 'Completada'
  | 'Cancelada'
  | 'No asistió';

// Enhanced Appointment interface for application use
export interface Appointment {
  id: string;
  profile_id: string;
  client_id: string;
  user_service_id: string; // Nueva referencia a user_services
  starts_at: string;
  ends_at: string;
  duration_minutes: number | null;
  status: AppointmentStatus;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
}

// Appointment with client and service information for display
export interface AppointmentWithDetails extends Appointment {
  client: {
    id: string;
    name: string;
    phone: string | null;
    email: string | null;
    age: number | null;
  };
  user_service: {
    id: string;
    custom_name: string | null;
    custom_description: string | null;
    price_cents: number;
    currency: string;
    duration_minutes: number;
    service: {
      id: string;
      name: string;
      description: string | null;
      category: {
        id: string;
        name: string;
        color: string | null;
      };
    };
  };
}

// Appointment creation data
export interface CreateAppointmentData {
  client_id: string;
  user_service_id: string; // Referencia al servicio del usuario
  starts_at: string;
  ends_at: string;
  duration_minutes?: number;
  notes?: string;
  status?: AppointmentStatus;
}

// Appointment update data
export interface UpdateAppointmentData {
  client_id?: string;
  user_service_id?: string;
  starts_at?: string;
  ends_at?: string;
  duration_minutes?: number;
  status?: AppointmentStatus;
  notes?: string;
}

// Appointment summary for calendar/list view
export interface AppointmentSummary {
  id: string;
  client_name: string;
  client_phone: string | null;
  starts_at: string;
  ends_at: string;
  duration_minutes: number | null;
  service_name: string;
  service_category: string;
  service_color: string | null;
  status: AppointmentStatus;
  status_display: AppointmentStatusDisplay;
  notes: string | null;
}

// Appointment filters for search and filtering
export interface AppointmentFilters {
  status?: AppointmentStatus | AppointmentStatus[];
  user_service_id?: string | string[];
  service_category_id?: string | string[];
  client_id?: string;
  date_from?: string;
  date_to?: string;
  date?: string; // Specific date
  upcoming?: boolean; // Only future appointments
  past?: boolean; // Only past appointments
  today?: boolean; // Only today's appointments
  this_week?: boolean;
  this_month?: boolean;
  search?: string; // Search in client name, service, notes
  sort_by?:
    | 'starts_at'
    | 'client_name'
    | 'service_name'
    | 'status'
    | 'created_at';
  sort_order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Time slot for scheduling
export interface TimeSlot {
  start: string; // HH:MM format
  end: string; // HH:MM format
  available: boolean;
  appointment_id?: string; // If occupied
}

// Daily schedule view
export interface DaySchedule {
  date: string; // YYYY-MM-DD format
  appointments: AppointmentWithDetails[];
  available_slots: TimeSlot[];
  total_appointments: number;
  total_duration_minutes: number;
  total_revenue_cents: number;
  total_revenue_display: string;
  first_appointment?: string; // Time of first appointment
  last_appointment?: string; // Time of last appointment
}

// Weekly schedule view
export interface WeekSchedule {
  week_start: string; // YYYY-MM-DD format
  week_end: string; // YYYY-MM-DD format
  days: DaySchedule[];
  total_appointments: number;
  busiest_day: string; // Day name with most appointments
}

// Appointment statistics for reporting
export interface AppointmentStats {
  total_appointments: number;
  scheduled_appointments: number;
  completed_appointments: number;
  cancelled_appointments: number;
  no_show_appointments: number;
  completion_rate: number; // Percentage
  cancellation_rate: number; // Percentage
  no_show_rate: number; // Percentage
  average_duration_minutes: number;
  most_common_service: string;
  busiest_hour: number; // 0-23
  busiest_day_of_week: number; // 0-6 (Sunday-Saturday)
  appointments_by_status: {
    scheduled: number;
    completed: number;
    cancelled: number;
    no_show: number;
  };
  appointments_by_service: Record<string, number>;
  monthly_trend: {
    month: string; // YYYY-MM format
    total: number;
    completed: number;
    cancelled: number;
  }[];
}

// Appointment reminders
export interface AppointmentReminder {
  appointment_id: string;
  client_name: string;
  client_phone: string | null;
  client_email: string | null;
  appointment_date: string;
  appointment_time: string;
  service_name: string;
  service_category: string;
  reminder_type: 'sms' | 'email' | 'whatsapp' | 'call';
  reminder_time: string; // When to send (e.g., "24h", "2h", "30m")
  sent: boolean;
  sent_at: string | null;
}

// Appointment conflicts and validations
export interface AppointmentConflict {
  type: 'overlap' | 'outside_hours' | 'past_date' | 'client_conflict';
  message: string;
  conflicting_appointment_id?: string;
  suggested_times?: string[];
}

// Recurring appointment pattern
export interface RecurringAppointmentPattern {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number; // Every N days/weeks/months
  days_of_week?: number[]; // For weekly: 0-6 (Sunday-Saturday)
  day_of_month?: number; // For monthly: 1-31
  end_date?: string; // When to stop creating appointments
  max_occurrences?: number; // Maximum number of appointments to create
}

// Bulk appointment operations
export interface BulkAppointmentOperation {
  action: 'cancel' | 'reschedule' | 'complete' | 'delete';
  appointment_ids: string[];
  new_status?: AppointmentStatus;
  new_date?: string;
  reason?: string;
}

// Response types for API calls
export interface AppointmentResponse {
  data: Appointment | null;
  error: string | null;
}

export interface AppointmentListResponse {
  data: AppointmentWithDetails[];
  count: number;
  error: string | null;
}

export interface AppointmentStatsResponse {
  data: AppointmentStats;
  error: string | null;
}

export interface DayScheduleResponse {
  data: DaySchedule;
  error: string | null;
}

export interface WeekScheduleResponse {
  data: WeekSchedule;
  error: string | null;
}

// Utility functions type definitions
export interface AppointmentUtils {
  formatTime: (datetime: string) => string;
  formatDate: (datetime: string) => string;
  formatDuration: (minutes: number) => string;
  getStatusDisplay: (status: AppointmentStatus) => AppointmentStatusDisplay;
  getStatusColor: (status: AppointmentStatus) => string;
  isUpcoming: (datetime: string) => boolean;
  isPast: (datetime: string) => boolean;
  isToday: (datetime: string) => boolean;
  calculateDuration: (start: string, end: string) => number;
}
