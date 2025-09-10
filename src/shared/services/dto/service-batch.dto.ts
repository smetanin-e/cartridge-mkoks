import { ServiceFormType } from '@/shared/schemas/service-schema';
import { Cartridge } from '@prisma/client';

//тип отправки данных в API/batch (POST)
export type ServiceBatchDTO = ServiceFormType & { cartridges: number[] };

//тип получения партий с картриджами с API/batch (GET)
export type Batch = {
  id: string;
  date: string;
  responsible: string;
  cartridges: Cartridge[];
};
