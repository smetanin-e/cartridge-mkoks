import { ServiceFormType } from '@/shared/schemas/service-schema';
import { BatchStatus, CartridgeStatus, Model } from '@prisma/client';

//тип отправки данных в API/batch (POST)
export type ServiceBatchDTO = ServiceFormType & { cartridges: number[] };

//тип получения партий с картриджами с API/batch (GET)
export type BatchCartridges = {
  id: number;
  number: string;
  numericNumber: number;
  model: Model;
  status: CartridgeStatus;

  returned: boolean;
  returnDate: string;
  returnResponsible: string;
  returnNotes: string;
};

export type Batch = {
  id: string;
  date: string;
  responsible: string;
  status: BatchStatus;
  partialReturnDate: string | null;
  cartridges: BatchCartridges[];
};

export type ReturnCartrige = {
  batchId: string;
  date: string;
  responsible: string;
  notes: string | null;
  cartridges: number[];
};
