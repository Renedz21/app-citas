import { Appointment } from '@/types/dummy-data.type';

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
