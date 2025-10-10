import { UserRole } from '@prisma/client';

export type AuthUser = {
  id: number;
  login: string;
  role: string;
  surname: string;
  firstName: string;
  lastName: string;
};

export type Agent = {
  id: number;
  login: string;
  surname: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: boolean;
};
