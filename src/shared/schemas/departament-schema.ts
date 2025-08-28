import z from 'zod';

export const createDepartamentSchema = z.object({
  name: z.string().min(2, { message: 'Необходимо заполнить название подразделения' }),
});

export type FormDepartamentType = z.infer<typeof createDepartamentSchema>;
