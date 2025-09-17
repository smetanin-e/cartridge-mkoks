import { create } from 'zustand';
import { Batch } from '../services/dto/service-batch.dto';
import { Api } from '../services';
import { BatchStatus } from '@prisma/client';

interface ServiceBatchState {
  //Получение созданных партий
  batches: Batch[];
  getBatchesFromDB: (params?: BatchStatus[]) => Promise<void>;
}

export const useServiceBatchStore = create<ServiceBatchState>()((set) => ({
  //
  batches: [],
  getBatchesFromDB: async (statuses?: BatchStatus[]) => {
    try {
      const data = await Api.batch.getBatches(statuses);
      set({ batches: data });
    } catch (error) {
      console.error(error);
    }
  },
}));
