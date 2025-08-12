import UserIcon from '@/assets/icons/user.svg';
import LockIcon from '@/assets/icons/lock.svg';
import CreditCardIcon from '@/assets/icons/credit-card.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import MapPinIcon from '@/assets/icons/map-pin.svg';
import DollarSignIcon from '@/assets/icons/dollar-sign.svg';
import BellIcon from '@/assets/icons/bell.svg';
import ClockIcon from '@/assets/icons/clock.svg';
import MailIcon from '@/assets/icons/mail.svg';
import HelpCircleIcon from '@/assets/icons/help-circle.svg';
import MessageCircleIcon from '@/assets/icons/message-circle.svg';
import InfoIcon from '@/assets/icons/info.svg';
import LogOutIcon from '@/assets/icons/log-out.svg';
import EditIcon from '@/assets/icons/pencil.svg';
import StarIcon from '@/assets/icons/star.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';
import { SvgProps } from 'react-native-svg';

export interface SettingItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ComponentType<SvgProps>;
  iconColor: string;
  iconBgColor: string;
  type: 'navigation' | 'switch' | 'action';
  action?: () => void;
  href?: string;
}

export interface SettingsSection {
  id: string;
  title: string;
  items: SettingItem[];
}

export const SETTINGS_PROFILE = {
  name: 'Dr. Alex Martínez',
  specialty: 'Psicología Clínica • Lic. #12345',
  email: 'alex.martinez@clinica.com',
  initials: 'AM'
};

export const PREMIUM_CONFIG = {
  title: 'Upgrade to Premium',
  subtitle: 'Desbloquea características avanzadas y análisis profesionales',
  price: 'Desde $25/mes',
  trial: '7 días gratis',
  icon: StarIcon,
  href: '/premium'
};

export const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: 'account',
    title: 'Cuenta',
    items: [
      {
        id: 'edit-profile',
        title: 'Editar Perfil',
        subtitle: 'Información personal',
        icon: UserIcon,
        iconColor: '#3B82F6',
        iconBgColor: 'bg-blue-100',
        type: 'navigation'
      },
      {
        id: 'security',
        title: 'Seguridad',
        subtitle: 'Contraseña y autenticación',
        icon: LockIcon,
        iconColor: '#10B981',
        iconBgColor: 'bg-green-100',
        type: 'navigation'
      },
      {
        id: 'billing',
        title: 'Facturación',
        subtitle: 'Métodos de pago y facturas',
        icon: CreditCardIcon,
        iconColor: '#8B5CF6',
        iconBgColor: 'bg-purple-100',
        type: 'navigation'
      }
    ]
  },
  {
    id: 'practice',
    title: 'Práctica Profesional',
    items: [
      {
        id: 'schedule',
        title: 'Horarios',
        subtitle: 'Disponibilidad y horarios',
        icon: CalendarIcon,
        iconColor: '#4F46E5',
        iconBgColor: 'bg-indigo-100',
        type: 'navigation'
      },
      {
        id: 'location',
        title: 'Ubicación',
        subtitle: 'Dirección del consultorio',
        icon: MapPinIcon,
        iconColor: '#F59E0B',
        iconBgColor: 'bg-amber-100',
        type: 'navigation'
      },
      {
        id: 'rates',
        title: 'Tarifas',
        subtitle: 'Precios de consultas',
        icon: DollarSignIcon,
        iconColor: '#10B981',
        iconBgColor: 'bg-emerald-100',
        type: 'navigation'
      }
    ]
  },
  {
    id: 'notifications',
    title: 'Notificaciones',
    items: [
      {
        id: 'push-notifications',
        title: 'Notificaciones Push',
        subtitle: 'Alertas en el dispositivo',
        icon: BellIcon,
        iconColor: '#3B82F6',
        iconBgColor: 'bg-blue-100',
        type: 'switch'
      },
      {
        id: 'appointment-reminders',
        title: 'Recordatorios de Citas',
        subtitle: 'Avisos antes de las citas',
        icon: ClockIcon,
        iconColor: '#10B981',
        iconBgColor: 'bg-green-100',
        type: 'switch'
      },
      {
        id: 'email-notifications',
        title: 'Notificaciones por Email',
        subtitle: 'Resúmenes y reportes',
        icon: MailIcon,
        iconColor: '#8B5CF6',
        iconBgColor: 'bg-purple-100',
        type: 'switch'
      }
    ]
  },
  {
    id: 'support',
    title: 'Soporte y Acerca de',
    items: [
      {
        id: 'help-center',
        title: 'Centro de Ayuda',
        subtitle: 'FAQ y guías',
        icon: HelpCircleIcon,
        iconColor: '#3B82F6',
        iconBgColor: 'bg-blue-100',
        type: 'navigation'
      },
      {
        id: 'contact-support',
        title: 'Contactar Soporte',
        subtitle: 'Ayuda técnica',
        icon: MessageCircleIcon,
        iconColor: '#10B981',
        iconBgColor: 'bg-green-100',
        type: 'navigation'
      },
      {
        id: 'about',
        title: 'Acerca de la App',
        subtitle: 'Versión 1.0.0',
        icon: InfoIcon,
        iconColor: '#64748B',
        iconBgColor: 'bg-slate-100',
        type: 'navigation'
      },
      {
        id: 'logout',
        title: 'Cerrar Sesión',
        subtitle: 'Salir de la cuenta',
        icon: LogOutIcon,
        iconColor: '#EF4444',
        iconBgColor: 'bg-red-100',
        type: 'action'
      }
    ]
  }
];

export { EditIcon, StarIcon, ChevronRightIcon };
