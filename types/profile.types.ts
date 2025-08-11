/**
 * Profile Types - Professional/User Profile Management
 * Represents healthcare professionals, consultants, or service providers
 */

import { Database } from './database';

// Base types from database
export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

// Enhanced Profile interface for application use
export interface Profile {
  id: string;
  auth_uid: string;
  full_name: string;
  email: string;
  phone: string | null;
  created_at: string;
  updated_at: string | null;
}

// Profile creation data (for registration/signup)
export interface CreateProfileData {
  auth_uid: string;
  full_name: string;
  email: string;
  phone?: string;
}

// Profile update data (for settings/profile editing)
export interface UpdateProfileData {
  full_name?: string;
  email?: string;
  phone?: string;
}

// Profile with computed/joined data for UI display
export interface ProfileWithStats extends Profile {
  total_clients: number;
  total_appointments: number;
  total_revenue: number;
  active_subscription?: {
    plan: string;
    status: string;
    ends_at: string | null;
  };
}

// Professional specialties/categories
export type ProfessionalCategory =
  | 'psychology'
  | 'medicine'
  | 'dentistry'
  | 'physiotherapy'
  | 'nutrition'
  | 'coaching'
  | 'consulting'
  | 'beauty'
  | 'fitness'
  | 'other';

// Profile settings for professional practice
export interface ProfileSettings {
  category: ProfessionalCategory;
  license_number?: string;
  specialization?: string;
  consultation_fee: number;
  currency: string;
  timezone: string;
  working_hours: {
    monday: { start: string; end: string; enabled: boolean };
    tuesday: { start: string; end: string; enabled: boolean };
    wednesday: { start: string; end: string; enabled: boolean };
    thursday: { start: string; end: string; enabled: boolean };
    friday: { start: string; end: string; enabled: boolean };
    saturday: { start: string; end: string; enabled: boolean };
    sunday: { start: string; end: string; enabled: boolean };
  };
  break_duration: number; // minutes between appointments
  advance_booking_days: number; // how many days in advance clients can book
}

// Profile filters for search/listing
export interface ProfileFilters {
  category?: ProfessionalCategory;
  location?: string;
  has_active_subscription?: boolean;
  created_after?: string;
  created_before?: string;
}

// Profile response for API calls
export interface ProfileResponse {
  data: Profile | null;
  error: string | null;
}

export interface ProfileListResponse {
  data: Profile[];
  count: number;
  error: string | null;
}
