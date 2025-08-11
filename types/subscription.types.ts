/**
 * Subscription Types - Premium Plan Management
 * Represents subscription plans, billing, and premium features
 */

import { Database } from './database';

// Base types from database
export type SubscriptionRow =
  Database['public']['Tables']['subscriptions']['Row'];
export type SubscriptionInsert =
  Database['public']['Tables']['subscriptions']['Insert'];
export type SubscriptionUpdate =
  Database['public']['Tables']['subscriptions']['Update'];

// Subscription plan types
export type SubscriptionPlan = 'basic' | 'pro' | 'enterprise' | 'premium';

// Subscription status enum
export type SubscriptionStatus =
  | 'active'
  | 'past_due'
  | 'cancelled'
  | 'trialing'
  | 'incomplete'
  | 'unpaid';

// Billing intervals
export type BillingInterval = 'monthly' | 'yearly' | 'lifetime';

// Enhanced Subscription interface for application use
export interface Subscription {
  id: string;
  profile_id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  started_at: string;
  ends_at: string | null;
  auto_renew: boolean;
}

// Plan features configuration
export interface PlanFeatures {
  max_clients: number | null; // null = unlimited
  max_appointments_per_month: number | null; // null = unlimited
  max_storage_gb: number | null; // null = unlimited
  advanced_analytics: boolean;
  custom_branding: boolean;
  api_access: boolean;
  priority_support: boolean;
  multi_location: boolean;
  team_members: number | null; // null = unlimited
  automated_reminders: boolean;
  online_booking: boolean;
  payment_processing: boolean;
  custom_forms: boolean;
  data_export: boolean;
  white_label: boolean;
}

// Plan pricing information
export interface PlanPricing {
  plan: SubscriptionPlan;
  name: string;
  description: string;
  monthly_price_cents: number;
  yearly_price_cents: number;
  currency: string;
  features: PlanFeatures;
  popular: boolean;
  trial_days: number;
  setup_fee_cents?: number;
  discount_percentage?: number; // For yearly plans
}

// Subscription with plan details for display
export interface SubscriptionWithPlan extends Subscription {
  plan_details: PlanPricing;
  usage: SubscriptionUsage;
  billing_info: BillingInfo;
}

// Current usage statistics
export interface SubscriptionUsage {
  current_clients: number;
  max_clients: number | null;
  current_appointments_this_month: number;
  max_appointments_per_month: number | null;
  current_storage_gb: number;
  max_storage_gb: number | null;
  current_team_members: number;
  max_team_members: number | null;
  usage_percentage: {
    clients: number;
    appointments: number;
    storage: number;
    team_members: number;
  };
  is_over_limit: {
    clients: boolean;
    appointments: boolean;
    storage: boolean;
    team_members: boolean;
  };
}

// Billing information
export interface BillingInfo {
  billing_interval: BillingInterval;
  next_billing_date: string | null;
  last_payment_date: string | null;
  last_payment_amount_cents: number | null;
  payment_method: {
    type: 'card' | 'paypal' | 'bank_transfer';
    last_four?: string;
    brand?: string;
    expires?: string;
  } | null;
  billing_address: {
    name: string;
    email: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    tax_id?: string;
  } | null;
}

// Subscription creation data
export interface CreateSubscriptionData {
  plan: SubscriptionPlan;
  billing_interval: BillingInterval;
  payment_method_id?: string;
  trial_days?: number;
  auto_renew?: boolean;
}

// Subscription update data
export interface UpdateSubscriptionData {
  plan?: SubscriptionPlan;
  status?: SubscriptionStatus;
  ends_at?: string;
  auto_renew?: boolean;
}

// Plan change request
export interface PlanChangeRequest {
  new_plan: SubscriptionPlan;
  new_billing_interval?: BillingInterval;
  effective_date?: string; // 'immediate' or future date
  proration: boolean;
}

// Subscription history/audit log
export interface SubscriptionHistory {
  id: string;
  subscription_id: string;
  action:
    | 'created'
    | 'upgraded'
    | 'downgraded'
    | 'cancelled'
    | 'renewed'
    | 'expired'
    | 'payment_failed';
  from_plan?: SubscriptionPlan;
  to_plan?: SubscriptionPlan;
  amount_cents?: number;
  currency?: string;
  reason?: string;
  created_at: string;
  created_by: string; // user_id or 'system'
}

// Trial information
export interface TrialInfo {
  is_trial: boolean;
  trial_start: string | null;
  trial_end: string | null;
  trial_days_remaining: number;
  trial_expired: boolean;
  can_extend_trial: boolean;
  max_trial_extensions: number;
  trial_extensions_used: number;
}

// Available plans for display
export interface AvailablePlans {
  plans: PlanPricing[];
  current_plan: SubscriptionPlan | null;
  recommended_plan: SubscriptionPlan | null;
  can_upgrade: boolean;
  can_downgrade: boolean;
  upgrade_options: SubscriptionPlan[];
  downgrade_options: SubscriptionPlan[];
}

// Subscription analytics
export interface SubscriptionAnalytics {
  total_subscribers: number;
  subscribers_by_plan: Record<SubscriptionPlan, number>;
  subscribers_by_status: Record<SubscriptionStatus, number>;
  monthly_recurring_revenue_cents: number;
  annual_recurring_revenue_cents: number;
  average_revenue_per_user_cents: number;
  churn_rate: number;
  growth_rate: number;
  trial_conversion_rate: number;
  plan_distribution: {
    plan: SubscriptionPlan;
    count: number;
    percentage: number;
    revenue_cents: number;
  }[];
  retention_cohort: {
    month: string;
    new_subscribers: number;
    retained_1_month: number;
    retained_3_months: number;
    retained_6_months: number;
    retained_12_months: number;
  }[];
}

// Payment and invoice for subscription
export interface SubscriptionInvoice {
  id: string;
  subscription_id: string;
  invoice_number: string;
  amount_cents: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
  period_start: string;
  period_end: string;
  issued_at: string;
  due_date: string;
  paid_at: string | null;
  payment_method: string | null;
  line_items: {
    description: string;
    amount_cents: number;
    quantity: number;
    period_start?: string;
    period_end?: string;
  }[];
  tax_amount_cents: number;
  discount_amount_cents: number;
  total_amount_cents: number;
}

// Subscription limits and warnings
export interface SubscriptionLimits {
  clients_limit_reached: boolean;
  clients_warning_threshold: boolean; // 80% of limit
  appointments_limit_reached: boolean;
  appointments_warning_threshold: boolean;
  storage_limit_reached: boolean;
  storage_warning_threshold: boolean;
  team_members_limit_reached: boolean;
  upgrade_required_for: string[]; // List of features requiring upgrade
  warnings: {
    type: 'clients' | 'appointments' | 'storage' | 'team_members';
    message: string;
    action_required: boolean;
  }[];
}

// Feature access control
export interface FeatureAccess {
  can_add_clients: boolean;
  can_schedule_appointments: boolean;
  can_use_advanced_analytics: boolean;
  can_customize_branding: boolean;
  can_access_api: boolean;
  can_add_team_members: boolean;
  can_use_online_booking: boolean;
  can_process_payments: boolean;
  can_export_data: boolean;
  has_priority_support: boolean;
  restrictions: {
    feature: string;
    reason: string;
    required_plan: SubscriptionPlan;
  }[];
}

// Response types for API calls
export interface SubscriptionResponse {
  data: Subscription | null;
  error: string | null;
}

export interface SubscriptionWithPlanResponse {
  data: SubscriptionWithPlan | null;
  error: string | null;
}

export interface AvailablePlansResponse {
  data: AvailablePlans;
  error: string | null;
}

export interface SubscriptionAnalyticsResponse {
  data: SubscriptionAnalytics;
  error: string | null;
}

export interface SubscriptionInvoiceResponse {
  data: SubscriptionInvoice | null;
  error: string | null;
}

export interface SubscriptionLimitsResponse {
  data: SubscriptionLimits;
  error: string | null;
}

export interface FeatureAccessResponse {
  data: FeatureAccess;
  error: string | null;
}

// Utility functions type definitions
export interface SubscriptionUtils {
  formatPrice: (cents: number, currency: string) => string;
  calculateDiscountedPrice: (
    original_cents: number,
    discount_percentage: number
  ) => number;
  getDaysUntilExpiration: (ends_at: string) => number;
  isExpired: (ends_at: string) => boolean;
  isExpiringSoon: (ends_at: string, days: number) => boolean;
  getStatusColor: (status: SubscriptionStatus) => string;
  getStatusDisplay: (status: SubscriptionStatus) => string;
  canAccessFeature: (
    feature: keyof PlanFeatures,
    current_plan: SubscriptionPlan
  ) => boolean;
  getUpgradeRecommendation: (
    usage: SubscriptionUsage,
    current_plan: SubscriptionPlan
  ) => SubscriptionPlan | null;
}
