import { Appointment, Client } from '@/types/dummy-data.type';

export const appointments: Appointment[] = [
  {
    id: '1',
    date: '2024-01-01',
    time: '10:00 AM',
    duration: '60 min',
    name: 'Lucía Pérez',
    service: 'Sesión de terapia',
    phone: '(555) 234-9876',
    notes: 'Primera consulta',
    status: 'Confirmada'
  },
  {
    id: '2',
    date: '2024-01-01',
    time: '1:30 PM',
    duration: '45 min',
    name: 'Carlos Mendoza',
    service: 'Consulta de seguimiento',
    phone: '(555) 789-1234',
    notes: 'Cliente frecuente',
    status: 'Pendiente'
  },
  {
    id: '3',
    date: '2024-01-01',
    time: '4:00 PM',
    duration: '45 min',
    name: 'María González',
    service: 'Consulta de seguimiento',
    phone: '(555) 789-1234',
    notes: 'Cliente frecuente',
    status: 'Cancelada'
  }
];

export const clients: Client[] = [
  {
    id: '1',
    name: 'Lucía Pérez',
    email: 'lucia.perez@email.com',
    phone: '(555) 234-9876',
    age: 28,
    gender: 'Femenino',
    lastVisit: '2024-01-15',
    nextAppointment: '2024-01-22',
    totalSessions: 8,
    status: 'Activo',
    notes: 'Progreso excelente en terapia cognitiva',
    diagnosis: 'Ansiedad generalizada'
  },
  {
    id: '2',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    phone: '(555) 789-1234',
    age: 35,
    gender: 'Masculino',
    lastVisit: '2024-01-10',
    nextAppointment: '2024-01-20',
    totalSessions: 12,
    status: 'Activo',
    notes: 'Cliente frecuente, muy comprometido con el tratamiento',
    diagnosis: 'Trastorno depresivo mayor'
  },
  {
    id: '3',
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '(555) 456-7890',
    age: 42,
    gender: 'Femenino',
    lastVisit: '2024-01-08',
    totalSessions: 15,
    status: 'Activo',
    notes: 'Trabajando en técnicas de manejo del estrés',
    diagnosis: 'Trastorno de estrés postraumático'
  },
  {
    id: '4',
    name: 'Roberto Silva',
    email: 'roberto.silva@email.com',
    phone: '(555) 321-6549',
    age: 29,
    gender: 'Masculino',
    lastVisit: '2023-12-20',
    totalSessions: 6,
    status: 'Inactivo',
    notes: 'No ha asistido a las últimas citas programadas',
    diagnosis: 'Trastorno de pánico'
  },
  {
    id: '5',
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '(555) 987-6543',
    age: 31,
    gender: 'Femenino',
    lastVisit: '2024-01-18',
    nextAppointment: '2024-01-25',
    totalSessions: 3,
    status: 'Nuevo',
    notes: 'Primera vez en terapia, muy motivada',
    diagnosis: 'Evaluación inicial'
  },
  {
    id: '6',
    name: 'Diego Torres',
    email: 'diego.torres@email.com',
    phone: '(555) 654-3210',
    age: 38,
    gender: 'Masculino',
    lastVisit: '2024-01-12',
    nextAppointment: '2024-01-19',
    totalSessions: 20,
    status: 'Activo',
    notes: 'Excelente evolución, próximo a alta terapéutica',
    diagnosis: 'Trastorno obsesivo-compulsivo'
  }
];
