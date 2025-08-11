import z from 'zod';

export const newKartrigeSchema = z.object({
  number: z.string().regex(/^МК\d{3}$/, { message: 'Формат номера: МК000' }),
  model: z.string().min(4, { message: 'Необходимо выбрать модель из списка' }),
});

export type FormNewCartrigeType = z.infer<typeof newKartrigeSchema>;
