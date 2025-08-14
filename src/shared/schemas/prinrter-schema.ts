import { z } from 'zod';

const modelRefSchema = z.object({
  id: z.number().int().positive(),
});

export const printerSchema = z.object({
  name: z.string().min(4, 'Минимум 4 символа'),
  models: z
    .array(modelRefSchema)
    .min(1, 'Нужно выбрать минимум одну модель')
    .superRefine((arr, ctx) => {
      const seen = new Set<number>();
      arr.forEach((m, i) => {
        if (seen.has(m.id)) {
          ctx.addIssue({
            code: 'custom',
            path: [i, 'id'],
            message: `Дубликат id: ${m.id}`,
          });
        }
        seen.add(m.id);
      });
    }),
});

export type PrinterFormType = z.infer<typeof printerSchema>;
