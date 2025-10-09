import { UserRole } from '@prisma/client';

export type Agent = {
  id: number;
  login: string;
  surname: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: boolean;
};
