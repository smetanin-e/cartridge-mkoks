export const CARTRIDGE_STATUS_CONFIG = {
  AVAILABLE: {
    label: 'Готов к использованию',
    color: 'bg-green-500',
    textColor: 'text-green-700',
    bgColor: 'bg-green-50',
  },
  RESERVE: {
    label: 'В резерве',
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
  },
  WORKING: {
    label: 'В работе',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
  },
  SERVICE: {
    label: 'В сервисе',
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
  },
  REFILL: {
    label: 'Требуется заправка',
    color: 'bg-purple-500',
    textColor: 'text-purple-700',
    bgColor: 'bg-purple-50',
  },
} as const;
