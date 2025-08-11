/**
 * Service Types - Professional Services Management
 * Sistema completo de gestión de servicios con categorías, servicios base y servicios por usuario
 */

// =============================================================================
// SERVICE CATEGORIES
// =============================================================================

// Service Category interface
export interface ServiceCategory {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  is_active: boolean;
  created_at: string;
}

// Service Category creation data
export interface CreateServiceCategoryData {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  is_active?: boolean;
}

// Service Category with stats
export interface ServiceCategoryWithStats extends ServiceCategory {
  service_count: number;
  active_service_count: number;
  professional_count: number; // Cuántos profesionales usan servicios de esta categoría
}

// =============================================================================
// BASE SERVICES (Templates/Plantillas globales)
// =============================================================================

// Base Service interface (plantilla global)
export interface Service {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  suggested_price_cents: number | null;
  currency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

// Service with category information
export interface ServiceWithCategory extends Service {
  category: ServiceCategory;
}

// Service creation data
export interface CreateServiceData {
  category_id: string;
  name: string;
  description?: string;
  duration_minutes?: number;
  suggested_price_cents?: number;
  currency?: string;
  is_active?: boolean;
}

// Service update data
export interface UpdateServiceData {
  category_id?: string;
  name?: string;
  description?: string;
  duration_minutes?: number;
  suggested_price_cents?: number;
  currency?: string;
  is_active?: boolean;
}

// =============================================================================
// USER SERVICES (Servicios que ofrece cada profesional)
// =============================================================================

// User Service interface (servicio específico de un profesional)
export interface UserService {
  id: string;
  profile_id: string;
  service_id: string;
  custom_name: string | null;
  custom_description: string | null;
  price_cents: number;
  currency: string;
  duration_minutes: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

// User Service with complete information for display
export interface UserServiceWithDetails extends UserService {
  service: ServiceWithCategory;
  display_name: string; // custom_name o service.name
  display_description: string | null; // custom_description o service.description
  price_display: string; // Precio formateado con moneda
  duration_display: string; // Duración formateada
}

// User Service creation data
export interface CreateUserServiceData {
  service_id: string;
  custom_name?: string;
  custom_description?: string;
  price_cents: number;
  currency?: string;
  duration_minutes?: number;
  is_active?: boolean;
}

// User Service update data
export interface UpdateUserServiceData {
  custom_name?: string;
  custom_description?: string;
  price_cents?: number;
  currency?: string;
  duration_minutes?: number;
  is_active?: boolean;
}

// =============================================================================
// FILTERS AND QUERIES
// =============================================================================

// Service Category filters
export interface ServiceCategoryFilters {
  is_active?: boolean;
  search?: string;
  sort_by?: 'name' | 'created_at';
  sort_order?: 'asc' | 'desc';
}

// Base Service filters
export interface ServiceFilters {
  category_id?: string;
  is_active?: boolean;
  price_min_cents?: number;
  price_max_cents?: number;
  duration_min_minutes?: number;
  duration_max_minutes?: number;
  search?: string; // Search in name, description
  sort_by?:
    | 'name'
    | 'suggested_price_cents'
    | 'duration_minutes'
    | 'created_at';
  sort_order?: 'asc' | 'desc';
}

// User Service filters
export interface UserServiceFilters {
  category_id?: string;
  is_active?: boolean;
  price_min_cents?: number;
  price_max_cents?: number;
  duration_min_minutes?: number;
  duration_max_minutes?: number;
  search?: string;
  sort_by?: 'display_name' | 'price_cents' | 'duration_minutes' | 'created_at';
  sort_order?: 'asc' | 'desc';
}

// =============================================================================
// STATISTICS AND ANALYTICS
// =============================================================================

// Service statistics for a professional
export interface UserServiceStats {
  total_services: number;
  active_services: number;
  inactive_services: number;
  services_by_category: Record<
    string,
    {
      category_name: string;
      count: number;
      color: string | null;
    }
  >;
  most_popular_service: {
    id: string;
    display_name: string;
    appointment_count: number;
  } | null;
  highest_revenue_service: {
    id: string;
    display_name: string;
    total_revenue_cents: number;
    total_revenue_display: string;
  } | null;
  average_service_price_cents: number;
  average_service_price_display: string;
  average_service_duration_minutes: number;
  price_range: {
    min_cents: number;
    max_cents: number;
    min_display: string;
    max_display: string;
  };
}

// Global service statistics (for admin/analytics)
export interface GlobalServiceStats {
  total_categories: number;
  total_base_services: number;
  total_user_services: number;
  most_popular_category: {
    id: string;
    name: string;
    professional_count: number;
  } | null;
  most_offered_service: {
    id: string;
    name: string;
    professional_count: number;
  } | null;
  average_price_by_category: Record<
    string,
    {
      category_name: string;
      average_price_cents: number;
      average_price_display: string;
    }
  >;
  price_distribution: {
    under_5000: number;
    between_5000_10000: number;
    between_10000_20000: number;
    over_20000: number;
  };
}

// =============================================================================
// SERVICE RECOMMENDATIONS
// =============================================================================

// Service recommendation for professionals based on their category
export interface ServiceRecommendation {
  service: ServiceWithCategory;
  reason: string;
  adoption_rate: number; // Porcentaje de profesionales que usan este servicio
  average_price_cents: number;
  average_price_display: string;
  is_already_offered: boolean;
}

// =============================================================================
// RESPONSE TYPES
// =============================================================================

// Service Category responses
export interface ServiceCategoryResponse {
  data: ServiceCategory | null;
  error: string | null;
}

export interface ServiceCategoryListResponse {
  data: ServiceCategoryWithStats[];
  count: number;
  error: string | null;
}

// Base Service responses
export interface ServiceResponse {
  data: ServiceWithCategory | null;
  error: string | null;
}

export interface ServiceListResponse {
  data: ServiceWithCategory[];
  count: number;
  error: string | null;
}

// User Service responses
export interface UserServiceResponse {
  data: UserServiceWithDetails | null;
  error: string | null;
}

export interface UserServiceListResponse {
  data: UserServiceWithDetails[];
  count: number;
  error: string | null;
}

// Statistics responses
export interface UserServiceStatsResponse {
  data: UserServiceStats;
  error: string | null;
}

export interface GlobalServiceStatsResponse {
  data: GlobalServiceStats;
  error: string | null;
}

// Recommendations response
export interface ServiceRecommendationsResponse {
  data: ServiceRecommendation[];
  error: string | null;
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export interface ServiceUtils {
  // Formatting functions
  formatPrice: (cents: number, currency: string) => string;
  formatDuration: (minutes: number) => string;

  // Display functions
  getDisplayName: (userService: UserService, baseService: Service) => string;
  getDisplayDescription: (
    userService: UserService,
    baseService: Service
  ) => string | null;

  // Price functions
  calculateTotalPrice: (userService: UserService, quantity?: number) => number;
  getPriceComparison: (
    userService: UserService,
    baseService: Service
  ) => {
    difference_cents: number;
    difference_percentage: number;
    is_higher: boolean;
    is_lower: boolean;
    is_same: boolean;
  };

  // Category functions
  getCategoryColor: (category: ServiceCategory) => string;
  getCategoryIcon: (category: ServiceCategory) => string;

  // Validation functions
  validateServicePrice: (price_cents: number, currency: string) => boolean;
  validateServiceDuration: (duration_minutes: number) => boolean;

  // Search functions
  searchServices: (
    services: ServiceWithCategory[],
    query: string
  ) => ServiceWithCategory[];
  searchUserServices: (
    userServices: UserServiceWithDetails[],
    query: string
  ) => UserServiceWithDetails[];
}

// =============================================================================
// CONSTANTS
// =============================================================================

// Predefined categories with their default colors and icons
export const DEFAULT_CATEGORIES = [
  { name: 'Medicina', icon: 'medical', color: '#10B981' },
  { name: 'Odontología', icon: 'tooth', color: '#3B82F6' },
  { name: 'Psicología', icon: 'brain', color: '#8B5CF6' },
  { name: 'Belleza', icon: 'sparkles', color: '#F59E0B' },
  { name: 'Fitness', icon: 'dumbbell', color: '#EF4444' },
  { name: 'Nutrición', icon: 'apple', color: '#10B981' },
  { name: 'Fisioterapia', icon: 'activity', color: '#06B6D4' },
  { name: 'Consultoría', icon: 'briefcase', color: '#6366F1' },
  { name: 'Legal', icon: 'scale', color: '#374151' },
  { name: 'Educación', icon: 'book', color: '#F97316' },
  { name: 'Veterinaria', icon: 'heart', color: '#EC4899' },
  { name: 'Otros', icon: 'more', color: '#6B7280' }
] as const;

// Price ranges for filtering
export const PRICE_RANGES = [
  { label: 'Menos de $50', min: 0, max: 4999 },
  { label: '$50 - $100', min: 5000, max: 9999 },
  { label: '$100 - $200', min: 10000, max: 19999 },
  { label: 'Más de $200', min: 20000, max: null }
] as const;

// Duration ranges for filtering
export const DURATION_RANGES = [
  { label: 'Menos de 30 min', min: 0, max: 29 },
  { label: '30 - 60 min', min: 30, max: 60 },
  { label: '1 - 2 horas', min: 61, max: 120 },
  { label: 'Más de 2 horas', min: 121, max: null }
] as const;
