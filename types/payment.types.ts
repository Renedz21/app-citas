/**
 * Payment Types - Financial Transaction Management
 * Represents payments, invoices, and financial transactions
 */

import { Database } from './database';

// Base types from database
export type PaymentRow = Database['public']['Tables']['payments']['Row'];
export type PaymentInsert = Database['public']['Tables']['payments']['Insert'];
export type PaymentUpdate = Database['public']['Tables']['payments']['Update'];

// Payment status enum for better type safety
export type PaymentStatus =
  | 'paid'
  | 'pending'
  | 'cancelled'
  | 'refunded'
  | 'partial';

// Payment method enum
export type PaymentMethod =
  | 'cash'
  | 'yape'
  | 'plin'
  | 'transfer'
  | 'gateway'
  | 'card'
  | 'check';

// Payment method display names in Spanish
export type PaymentMethodDisplay =
  | 'Efectivo'
  | 'Yape'
  | 'Plin'
  | 'Transferencia'
  | 'Tarjeta de Crédito'
  | 'Tarjeta de Débito'
  | 'Cheque'
  | 'PayPal'
  | 'Otro';

// Currency codes
export type Currency = 'PEN' | 'USD' | 'EUR' | 'COP' | 'MXN' | 'CLP' | 'ARS';

// Gateway information structure
export interface GatewayInfo {
  gateway_name: string; // 'stripe', 'paypal', 'mercadopago', etc.
  transaction_id: string;
  reference_id?: string;
  gateway_fee_cents?: number;
  gateway_status?: string;
  gateway_response?: Record<string, any>;
  card_last_four?: string;
  card_brand?: string;
}

// Enhanced Payment interface for application use
export interface Payment {
  id: string;
  profile_id: string;
  client_id: string;
  appointment_id: string | null;
  amount_cents: number;
  currency: Currency;
  method: PaymentMethod;
  status: PaymentStatus;
  gateway_info: GatewayInfo | null;
  paid_at: string | null;
  created_at: string;
}

// Payment with related data for display
export interface PaymentWithDetails extends Payment {
  client: {
    id: string;
    name: string;
    email: string | null;
    phone: string | null;
  };
  appointment?: {
    id: string;
    starts_at: string;
    service: string;
    status: string;
  };
  amount_display: string; // Formatted amount with currency
  method_display: PaymentMethodDisplay;
}

// Payment creation data
export interface CreatePaymentData {
  client_id: string;
  appointment_id?: string;
  amount_cents: number;
  currency?: Currency;
  method: PaymentMethod;
  status?: PaymentStatus;
  gateway_info?: GatewayInfo;
  paid_at?: string;
}

// Payment update data
export interface UpdatePaymentData {
  amount_cents?: number;
  method?: PaymentMethod;
  status?: PaymentStatus;
  gateway_info?: GatewayInfo;
  paid_at?: string;
}

// Payment summary for invoices and receipts
export interface PaymentSummary {
  id: string;
  client_name: string;
  amount_cents: number;
  currency: Currency;
  amount_display: string;
  method: PaymentMethod;
  method_display: PaymentMethodDisplay;
  status: PaymentStatus;
  paid_at: string | null;
  created_at: string;
  invoice_number?: string;
  receipt_number?: string;
}

// Payment filters for search and reporting
export interface PaymentFilters {
  status?: PaymentStatus | PaymentStatus[];
  method?: PaymentMethod | PaymentMethod[];
  currency?: Currency;
  client_id?: string;
  appointment_id?: string;
  amount_min_cents?: number;
  amount_max_cents?: number;
  paid_after?: string;
  paid_before?: string;
  created_after?: string;
  created_before?: string;
  search?: string; // Search in client name, invoice number, etc.
  sort_by?: 'amount_cents' | 'paid_at' | 'created_at' | 'client_name';
  sort_order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// Payment statistics for financial reporting
export interface PaymentStats {
  total_payments: number;
  total_amount_cents: number;
  total_amount_display: string;
  paid_payments: number;
  pending_payments: number;
  cancelled_payments: number;
  refunded_payments: number;
  paid_amount_cents: number;
  pending_amount_cents: number;
  refunded_amount_cents: number;
  average_payment_cents: number;
  payments_by_method: Record<
    PaymentMethod,
    {
      count: number;
      amount_cents: number;
      percentage: number;
    }
  >;
  payments_by_status: Record<
    PaymentStatus,
    {
      count: number;
      amount_cents: number;
      percentage: number;
    }
  >;
  monthly_revenue: {
    month: string; // YYYY-MM format
    amount_cents: number;
    amount_display: string;
    payment_count: number;
  }[];
  daily_revenue: {
    date: string; // YYYY-MM-DD format
    amount_cents: number;
    amount_display: string;
    payment_count: number;
  }[];
}

// Invoice information
export interface Invoice {
  id: string;
  payment_id: string;
  invoice_number: string;
  client_name: string;
  client_email: string | null;
  client_address?: string;
  items: InvoiceItem[];
  subtotal_cents: number;
  tax_cents: number;
  total_cents: number;
  currency: Currency;
  issued_date: string;
  due_date: string;
  paid_date: string | null;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  notes?: string;
}

// Invoice item
export interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price_cents: number;
  total_cents: number;
  service_date?: string;
}

// Receipt information
export interface Receipt {
  id: string;
  payment_id: string;
  receipt_number: string;
  client_name: string;
  amount_cents: number;
  currency: Currency;
  method: PaymentMethod;
  method_display: PaymentMethodDisplay;
  paid_at: string;
  issued_at: string;
  notes?: string;
}

// Refund information
export interface Refund {
  id: string;
  payment_id: string;
  amount_cents: number;
  currency: Currency;
  reason: string;
  status: 'pending' | 'completed' | 'failed';
  processed_at: string | null;
  gateway_refund_id?: string;
  created_at: string;
}

// Payment plan for installments
export interface PaymentPlan {
  id: string;
  client_id: string;
  total_amount_cents: number;
  currency: Currency;
  installments: number;
  installment_amount_cents: number;
  frequency: 'weekly' | 'monthly';
  start_date: string;
  status: 'active' | 'completed' | 'cancelled';
  payments: Payment[];
  next_payment_date: string | null;
  remaining_amount_cents: number;
}

// Financial summary for dashboard
export interface FinancialSummary {
  today: {
    revenue_cents: number;
    revenue_display: string;
    payment_count: number;
    pending_amount_cents: number;
  };
  this_week: {
    revenue_cents: number;
    revenue_display: string;
    payment_count: number;
    growth_percentage: number;
  };
  this_month: {
    revenue_cents: number;
    revenue_display: string;
    payment_count: number;
    growth_percentage: number;
  };
  this_year: {
    revenue_cents: number;
    revenue_display: string;
    payment_count: number;
    growth_percentage: number;
  };
  outstanding_balance_cents: number;
  outstanding_balance_display: string;
  most_profitable_service: string;
  top_paying_client: {
    name: string;
    total_paid_cents: number;
    total_paid_display: string;
  };
}

// Response types for API calls
export interface PaymentResponse {
  data: Payment | null;
  error: string | null;
}

export interface PaymentListResponse {
  data: PaymentWithDetails[];
  count: number;
  error: string | null;
}

export interface PaymentStatsResponse {
  data: PaymentStats;
  error: string | null;
}

export interface FinancialSummaryResponse {
  data: FinancialSummary;
  error: string | null;
}

export interface InvoiceResponse {
  data: Invoice | null;
  error: string | null;
}

export interface ReceiptResponse {
  data: Receipt | null;
  error: string | null;
}

// Utility functions type definitions
export interface PaymentUtils {
  formatAmount: (cents: number, currency: Currency) => string;
  getMethodDisplay: (method: PaymentMethod) => PaymentMethodDisplay;
  getStatusColor: (status: PaymentStatus) => string;
  calculateTax: (amount_cents: number, tax_rate: number) => number;
  generateInvoiceNumber: () => string;
  generateReceiptNumber: () => string;
  isOverdue: (due_date: string) => boolean;
  getDaysOverdue: (due_date: string) => number;
}
