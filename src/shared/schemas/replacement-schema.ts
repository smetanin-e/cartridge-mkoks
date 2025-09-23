import z from 'zod';

export const replacementSchema = z.object({
  date: z.string().min(10, { message: 'Некоректная дата' }),
  departamentId: z.number({ message: 'Укажите подразделение' }),
  installedCartridge: z.number({ message: 'Некоректный номер картриджа' }).nullable(),
  removedCartridge: z.number({ message: 'Некоректный номер картриджа' }).nullable(),
  responsible: z.string().min(5, { message: 'Нужно ввести фамилию и инициалы' }),
});

export type ReplacementFormType = z.infer<typeof replacementSchema>;
