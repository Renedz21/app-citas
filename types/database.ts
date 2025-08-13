/**
 * Auto-generated TypeScript types for Supabase Database
 * Generated from database schema - DO NOT EDIT MANUALLY
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          appointment_code: string;
          appointment_date: string;
          client_id: string;
          consultation_fee: number;
          created_at: string | null;
          duration_minutes: number;
          id: string;
          location_address: string | null;
          location_name: string | null;
          notes: string | null;
          professional_id: string;
          professional_service_id: string;
          session_number: string;
          start_time: string;
          status: string | null;
          updated_at: string | null;
        };
        Insert: {
          appointment_code: string;
          appointment_date: string;
          client_id: string;
          consultation_fee: number;
          created_at?: string | null;
          duration_minutes: number;
          id?: string;
          location_address?: string | null;
          location_name?: string | null;
          notes?: string | null;
          professional_id: string;
          professional_service_id: string;
          session_number: string;
          start_time: string;
          status?: string | null;
          updated_at?: string | null;
        };
        Update: {
          appointment_code?: string;
          appointment_date?: string;
          client_id?: string;
          consultation_fee?: number;
          created_at?: string | null;
          duration_minutes?: number;
          id?: string;
          location_address?: string | null;
          location_name?: string | null;
          notes?: string | null;
          professional_id?: string;
          professional_service_id?: string;
          session_number?: string;
          start_time?: string;
          status?: string | null;
          updated_at?: string | null;
        };
      };
      client_info: {
        Row: {
          allergies: string | null;
          client_id: string;
          created_at: string | null;
          diagnosis: string | null;
          health_notes: string | null;
          id: string;
          special_notes: string | null;
          updated_at: string | null;
        };
        Insert: {
          allergies?: string | null;
          client_id: string;
          created_at?: string | null;
          diagnosis?: string | null;
          health_notes?: string | null;
          id?: string;
          special_notes?: string | null;
          updated_at?: string | null;
        };
        Update: {
          allergies?: string | null;
          client_id?: string;
          created_at?: string | null;
          diagnosis?: string | null;
          health_notes?: string | null;
          id?: string;
          special_notes?: string | null;
          updated_at?: string | null;
        };
      };
      client_preferences: {
        Row: {
          client_id: string;
          communication_method: string | null;
          created_at: string | null;
          id: string;
          payment_method_id: string | null;
          preferred_schedule: string | null;
          reminder_hours: number | null;
          updated_at: string | null;
        };
        Insert: {
          client_id: string;
          communication_method?: string | null;
          created_at?: string | null;
          id?: string;
          payment_method_id?: string | null;
          preferred_schedule?: string | null;
          reminder_hours?: number | null;
          updated_at?: string | null;
        };
        Update: {
          client_id?: string;
          communication_method?: string | null;
          created_at?: string | null;
          id?: string;
          payment_method_id?: string | null;
          preferred_schedule?: string | null;
          reminder_hours?: number | null;
          updated_at?: string | null;
        };
      };
      clients: {
        Row: {
          age: number | null;
          created_at: string | null;
          gender: string | null;
          id: string;
          last_visit_date: string | null;
          next_appointment_date: string | null;
          status: string | null;
          total_spent: number | null;
          total_visits: number | null;
          updated_at: string | null;
        };
        Insert: {
          age?: number | null;
          created_at?: string | null;
          gender?: string | null;
          id: string;
          last_visit_date?: string | null;
          next_appointment_date?: string | null;
          status?: string | null;
          total_spent?: number | null;
          total_visits?: number | null;
          updated_at?: string | null;
        };
        Update: {
          age?: number | null;
          created_at?: string | null;
          gender?: string | null;
          id?: string;
          last_visit_date?: string | null;
          next_appointment_date?: string | null;
          status?: string | null;
          total_spent?: number | null;
          total_visits?: number | null;
          updated_at?: string | null;
        };
      };
      payment_methods: {
        Row: {
          card_brand: string | null;
          card_last_four: string | null;
          client_id: string;
          created_at: string | null;
          id: string;
          is_default: boolean | null;
          method_type: string;
        };
        Insert: {
          card_brand?: string | null;
          card_last_four?: string | null;
          client_id: string;
          created_at?: string | null;
          id?: string;
          is_default?: boolean | null;
          method_type: string;
        };
        Update: {
          card_brand?: string | null;
          card_last_four?: string | null;
          client_id?: string;
          created_at?: string | null;
          id?: string;
          is_default?: boolean | null;
          method_type?: string;
        };
      };
      payments: {
        Row: {
          amount: number;
          appointment_id: string;
          authorization_code: string | null;
          client_id: string;
          created_at: string | null;
          id: string;
          payment_method_id: string | null;
          status: string | null;
          transaction_date: string | null;
        };
        Insert: {
          amount: number;
          appointment_id: string;
          authorization_code?: string | null;
          client_id: string;
          created_at?: string | null;
          id?: string;
          payment_method_id?: string | null;
          status?: string | null;
          transaction_date?: string | null;
        };
        Update: {
          amount?: number;
          appointment_id?: string;
          authorization_code?: string | null;
          client_id?: string;
          created_at?: string | null;
          id?: string;
          payment_method_id?: string | null;
          status?: string | null;
          transaction_date?: string | null;
        };
      };
      professional_services: {
        Row: {
          created_at: string | null;
          custom_duration_minutes: number;
          custom_name: string | null;
          custom_price: number;
          id: string;
          is_active: boolean | null;
          professional_id: string;
          service_id: string;
        };
        Insert: {
          created_at?: string | null;
          custom_duration_minutes: number;
          custom_name?: string | null;
          custom_price: number;
          id?: string;
          is_active?: boolean | null;
          professional_id: string;
          service_id: string;
        };
        Update: {
          created_at?: string | null;
          custom_duration_minutes?: number;
          custom_name?: string | null;
          custom_price?: number;
          id?: string;
          is_active?: boolean | null;
          professional_id?: string;
          service_id?: string;
        };
      };
      profiles: {
        Row: {
          business_name: string | null;
          clerk_id: string | null;
          created_at: string | null;
          email: string | null;
          first_name: string;
          id: string;
          is_active: boolean | null;
          last_name: string;
          phone: string | null;
          profession: string | null;
          profile_type: string;
          specialization: string | null;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          business_name?: string | null;
          clerk_id?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name: string;
          id?: string;
          is_active?: boolean | null;
          last_name: string;
          phone?: string | null;
          profession?: string | null;
          profile_type?: string;
          specialization?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          business_name?: string | null;
          clerk_id?: string | null;
          created_at?: string | null;
          email?: string | null;
          first_name?: string;
          id?: string;
          is_active?: boolean | null;
          last_name?: string;
          phone?: string | null;
          profession?: string | null;
          profile_type?: string;
          specialization?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
      };
      service_categories: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          is_active: boolean | null;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          name: string;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          name?: string;
        };
      };
      services: {
        Row: {
          category_id: string;
          created_at: string | null;
          default_duration_minutes: number | null;
          description: string | null;
          id: string;
          is_active: boolean | null;
          name: string;
          suggested_price: number | null;
        };
        Insert: {
          category_id: string;
          created_at?: string | null;
          default_duration_minutes?: number | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          name: string;
          suggested_price?: number | null;
        };
        Update: {
          category_id?: string;
          created_at?: string | null;
          default_duration_minutes?: number | null;
          description?: string | null;
          id?: string;
          is_active?: boolean | null;
          name?: string;
          suggested_price?: number | null;
        };
      };
      session_notes: {
        Row: {
          appointment_id: string;
          category: string;
          client_id: string;
          content: string;
          created_at: string | null;
          id: string;
          note_date: string;
          professional_id: string;
          updated_at: string | null;
        };
        Insert: {
          appointment_id: string;
          category: string;
          client_id: string;
          content: string;
          created_at?: string | null;
          id?: string;
          note_date: string;
          professional_id: string;
          updated_at?: string | null;
        };
        Update: {
          appointment_id?: string;
          category?: string;
          client_id?: string;
          content?: string;
          created_at?: string | null;
          id?: string;
          note_date?: string;
          professional_id?: string;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_next_session_number: {
        Args: { client_uuid: string };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

// Enum types from database constraints
export type ProfileType = 'professional' | 'client';
export type Gender = 'male' | 'female' | 'non_binary' | 'prefer_not_say';
export type ClientStatus = 'active' | 'new' | 'inactive';
export type AppointmentStatus =
  | 'confirmed'
  | 'pending'
  | 'cancelled'
  | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';
