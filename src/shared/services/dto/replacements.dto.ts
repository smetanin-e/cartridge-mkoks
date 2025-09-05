import { Departament, Replacement } from '@prisma/client';
export type ReplacementsDTO = Replacement & {
  departament: Departament;
};
