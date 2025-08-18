import { Model, Printer } from '@prisma/client';

export type PrinterDTO = Printer & { models?: Model[] };

export type CreatePrinterDTO = {
  name: string;
  models: {
    id: number;
  }[];
};
