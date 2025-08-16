// Professional professions matching the schema
export const PROFESSIONS = [
  // Salud y Bienestar
  'Medicina General',
  'Psicología',
  'Fisioterapia',
  'Nutrición',
  'Odontología',
  // Belleza y Estética
  'Peluquería',
  'Barbería',
  'Estética Facial',
  'Manicure/Pedicure',
  'Masajes',
  // Tecnología
  'Desarrollo Web',
  'Diseño Gráfico',
  'Consultoría IT',
  'Reparación Técnica',
  // Servicios a Domicilio
  'Limpieza',
  'Jardinería',
  'Plomería',
  'Electricidad',
  'Carpintería',
  // Educación y Coaching
  'Clases Particulares',
  'Coaching Personal',
  'Entrenamiento Físico',
  // Otros
  'Fotografía',
  'Consultoría',
  'Otro'
];

// Gender options for client form
export const GENDER_OPTIONS = [
  'Masculino',
  'Femenino',
  'No binario',
  'Prefiero no decir'
];

// User type options
export const USER_TYPES = {
  PROFESSIONAL: 'professional',
  CLIENT: 'client'
} as const;
