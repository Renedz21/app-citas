import BarChartIcon from '@/assets/icons/chart.svg';
import CalendarIcon from '@/assets/icons/calendar.svg';
import UsersIcon from '@/assets/icons/users.svg';
import FileTextIcon from '@/assets/icons/file-text.svg';
import ShieldIcon from '@/assets/icons/shield.svg';
import ZapIcon from '@/assets/icons/zap.svg';
import PhoneIcon from '@/assets/icons/phone.svg';
import DownloadIcon from '@/assets/icons/download.svg';

export const FEATURES = [
  {
    icon: BarChartIcon,
    title: 'Análisis Avanzados',
    description:
      'Reportes detallados de tu práctica con métricas profesionales',
    color: '#3B82F6'
  },
  {
    icon: CalendarIcon,
    title: 'Calendario Ilimitado',
    description: 'Programa citas sin límites y gestiona múltiples horarios',
    color: '#10B981'
  },
  {
    icon: UsersIcon,
    title: 'Clientes Ilimitados',
    description: 'Gestiona tantos pacientes como necesites sin restricciones',
    color: '#8B5CF6'
  },
  {
    icon: FileTextIcon,
    title: 'Notas Clínicas Avanzadas',
    description: 'Plantillas personalizadas y historial clínico completo',
    color: '#F59E0B'
  },
  {
    icon: ShieldIcon,
    title: 'Backup Automático',
    description: 'Respaldo seguro en la nube de toda tu información',
    color: '#EF4444'
  },
  {
    icon: ZapIcon,
    title: 'Automatización',
    description: 'Recordatorios automáticos y flujos de trabajo optimizados',
    color: '#06B6D4'
  },
  {
    icon: PhoneIcon,
    title: 'Soporte Prioritario',
    description: 'Atención personalizada 24/7 para resolver cualquier duda',
    color: '#84CC16'
  },
  {
    icon: DownloadIcon,
    title: 'Exportación de Datos',
    description: 'Exporta reportes en PDF y Excel para análisis externos',
    color: '#F97316'
  }
];

export const BILLING_OPTIONS = [
  {
    id: 'monthly',
    title: 'Pago mensual',
    subtitle: '$24 / mes / miembro',
    price: 24,
    period: 'monthly'
  },
  {
    id: 'yearly',
    title: 'Pago anual',
    subtitle: '$20 / mes / miembro',
    price: 20,
    period: 'yearly',
    savings: 'Ahorra 17%',
    isRecommended: true
  }
];

export const PRICING_CONFIG = {
  basePrice: 24,
  yearlyPrice: 240,
  membersCount: 1
};
