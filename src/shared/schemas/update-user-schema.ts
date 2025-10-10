import z from 'zod';
import { createUserSchema } from './auth/create-user-schema';

export const updateUserSchema = createUserSchema
  .omit({
    login: true,
    password: true,
    confirmPassword: true,
  })
  .extend({
    id: z.number(),
  });

export type UpdateUserType = z.infer<typeof updateUserSchema>;
