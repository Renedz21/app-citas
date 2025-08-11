/**
 * Generated TypeScript types for Supabase Database
 * Auto-generated from database schema
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
          client_id: string;
          created_at: string;
          duration_minutes: number | null;
          ends_at: string;
          id: string;
          notes: string | null;
          profile_id: string;
          service: string;
          starts_at: string;
          status: string;
          updated_at: string | null;
        };
        Insert: {
          client_id: string;
          created_at?: string;
          duration_minutes?: number | null;
          ends_at: string;
          id?: string;
          notes?: string | null;
          profile_id: string;
          service?: string;
          starts_at: string;
          status: string;
          updated_at?: string | null;
        };
        Update: {
          client_id?: string;
          created_at?: string;
          duration_minutes?: number | null;
          ends_at?: string;
          id?: string;
          notes?: string | null;
          profile_id?: string;
          service?: string;
          starts_at?: string;
          status?: string;
          updated_at?: string | null;
        };
      };
      clients: {
        Row: {
          age: number | null;
          created_at: string;
          diagnosis: string | null;
          email: string | null;
          gender: string | null;
          id: string;
          last_visit: string | null;
          name: string;
          next_appointment: string | null;
          notes: string | null;
          phone: string | null;
          profile_id: string;
          status: string | null;
          total_sessions: number | null;
        };
        Insert: {
          age?: number | null;
          created_at?: string;
          diagnosis?: string | null;
          email?: string | null;
          gender?: string | null;
          id?: string;
          last_visit?: string | null;
          name: string;
          next_appointment?: string | null;
          notes?: string | null;
          phone?: string | null;
          profile_id: string;
          status?: string | null;
          total_sessions?: number | null;
        };
        Update: {
          age?: number | null;
          created_at?: string;
          diagnosis?: string | null;
          email?: string | null;
          gender?: string | null;
          id?: string;
          last_visit?: string | null;
          name?: string;
          next_appointment?: string | null;
          notes?: string | null;
          phone?: string | null;
          profile_id?: string;
          status?: string | null;
          total_sessions?: number | null;
        };
      };
      payments: {
        Row: {
          amount_cents: number;
          appointment_id: string | null;
          client_id: string;
          created_at: string;
          currency: string;
          gateway_info: Json | null;
          id: string;
          method: string;
          paid_at: string | null;
          profile_id: string;
          status: string;
        };
        Insert: {
          amount_cents: number;
          appointment_id?: string | null;
          client_id: string;
          created_at?: string;
          currency?: string;
          gateway_info?: Json | null;
          id?: string;
          method: string;
          paid_at?: string | null;
          profile_id: string;
          status: string;
        };
        Update: {
          amount_cents?: number;
          appointment_id?: string | null;
          client_id?: string;
          created_at?: string;
          currency?: string;
          gateway_info?: Json | null;
          id?: string;
          method?: string;
          paid_at?: string | null;
          profile_id?: string;
          status?: string;
        };
      };
      profiles: {
        Row: {
          auth_uid: string;
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          phone: string | null;
          updated_at: string | null;
        };
        Insert: {
          auth_uid: string;
          created_at?: string;
          email: string;
          full_name: string;
          id?: string;
          phone?: string | null;
          updated_at?: string | null;
        };
        Update: {
          auth_uid?: string;
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          phone?: string | null;
          updated_at?: string | null;
        };
      };
      subscriptions: {
        Row: {
          auto_renew: boolean;
          ends_at: string | null;
          id: string;
          plan: string;
          profile_id: string;
          started_at: string;
          status: string;
        };
        Insert: {
          auto_renew?: boolean;
          ends_at?: string | null;
          id?: string;
          plan: string;
          profile_id: string;
          started_at: string;
          status: string;
        };
        Update: {
          auto_renew?: boolean;
          ends_at?: string | null;
          id?: string;
          plan?: string;
          profile_id?: string;
          started_at?: string;
          status?: string;
        };
      };
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
