import { Model, Printer } from '@prisma/client';

export type PrinterDTO = Printer & { models?: Model[] };
