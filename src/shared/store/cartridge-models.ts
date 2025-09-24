import { create } from 'zustand';

import { Api } from '@/shared/services';
import { CartridgeModelDTO } from '../services/dto/cartridge-model.dto.';

interface ModelsState {
  loading: boolean;
  error: boolean;
  models: CartridgeModelDTO[];
  getModels: () => Promise<void>;

  //попап добавления новой модели
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}
export const useModelsStore = create<ModelsState>()((set) => ({
  loading: true,
  error: false,
  models: [],
  getModels: async () => {
    try {
      const getModels = await Api.models.getModels();
      set({ models: getModels });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  //попап добавления новой модели
  openModal: false,
  setOpenModal: (openModal) => set({ openModal }),
}));
