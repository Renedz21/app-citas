export interface Appointment {
  id: string;
  date: string;
  time: string;
  duration: string;
  name: string;
  service: string;
  phone: string;
  notes: string;
  status: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  lastVisit: string;
  nextAppointment?: string;
  totalSessions: number;
  status: 'Activo' | 'Inactivo' | 'Nuevo';
  notes: string;
  diagnosis?: string;
}
