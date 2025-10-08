export const USER_ROLES = [
  { id: 1, name: 'USER', label: 'Пользователь' },
  { id: 2, name: 'ADMIN', label: 'Администратор' },
];

export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type UserRole = (typeof Role)[keyof typeof Role];
