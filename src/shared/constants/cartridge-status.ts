import { AlertCircle, Bolt, CheckCircle, Clock, LifeBuoy, TriangleAlert } from 'lucide-react';
import { FormSelectType } from '../components/form/form-select';

export const CARTRIDGE_STATUS: FormSelectType[] = [
  { id: 1, name: 'AVAILABLE', label: 'Готов к использованию' },
  { id: 2, name: 'RESERVE', label: 'В резерве' },
  { id: 3, name: 'WORKING', label: 'В работе' },
  { id: 4, name: 'SERVICE', label: 'В сервисе' },
  { id: 5, name: 'REFILL', label: 'Требуется заправка' },
];

export const CARTRIDGE_STATUS_CONFIG = {
  AVAILABLE: {
    label: 'Готов к использованию',
    color: 'bg-green-500',
    textColor: 'text-green-500',
    bgColor: 'bg-green-50',
    icon: CheckCircle,
  },
  RESERVE: {
    label: 'В резерве',
    color: 'bg-blue-500',
    textColor: 'text-blue-500',
    bgColor: 'bg-blue-50',
    icon: LifeBuoy,
  },
  WORKING: {
    label: 'В работе',
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    bgColor: 'bg-orange-50',
    icon: Clock,
  },
  SERVICE: {
    label: 'В сервисе',
    color: 'bg-red-500',
    textColor: 'text-red-500',
    bgColor: 'bg-red-50',
    icon: Bolt,
  },
  REFILL: {
    label: 'Требуется заправка',
    color: 'bg-purple-500',
    textColor: 'text-purple-500',
    bgColor: 'bg-purple-50',
    icon: TriangleAlert,
  },
} as const;

export const BATCH_STATUS = {
  IN_PROGRESS: { label: 'В стадии заправки', color: 'bg-purple-500', icon: Clock },
  COMPLITED: { label: 'Выполнено', color: 'bg-green-500', icon: CheckCircle },
  PARTIAL_RETURN: { label: 'Частичный возврат', color: 'bg-orange-500', icon: AlertCircle },
} as const;
