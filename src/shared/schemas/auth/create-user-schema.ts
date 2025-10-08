import z from 'zod';
import { loginSchema } from './login-schema';
import { passwordSchema } from './password-schema';

export const createUserSchema = z
  .object({
    ...loginSchema.shape,
    surname: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа' }),
    firstName: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа' }),
    role: z.enum(['USER', 'ADMIN'] as const).refine((val) => !!val, { message: 'Укажите роль' }),
    lastName: z.string().min(2, { message: 'Фамилия должна содержать минимум 2 символа' }),
    confirmPassword: passwordSchema,
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    },
  );

export type CreateUserType = z.infer<typeof createUserSchema>;
