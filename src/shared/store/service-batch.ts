import { create } from 'zustand';
import { CartridgeDTO } from '../services/dto/cartridge-model.dto.';
import { Batch } from '../services/dto/service-batch.dto';
import { Api } from '../services';

interface ServiceBatchState {
  //обработка выбранных картриджей для создания партии
  checkedReserve: boolean;
  handleCheckedReserve: (checked: boolean) => void;
  selectedCartridges: number[];
  handleSelectAll: (checked: boolean, availableForService: CartridgeDTO[]) => void;
  handleCartridgeSelect: (cartridgeId: number, checked: boolean) => void;
  cleareSelectedCartridges: () => void;

  //Получение созданных партий
  batches: Batch[];
  getBatchesFromDB: () => Promise<void>;
}

export const useServiceBatchStore = create<ServiceBatchState>()((set) => ({
  checkedReserve: false,
  handleCheckedReserve: (checked) => {
    set({ checkedReserve: checked });
    if (!checked) {
      set({ selectedCartridges: [] });
    }
  },
  selectedCartridges: [],
  handleSelectAll: (checked, availableForService) => {
    if (checked) {
      const availableIds = availableForService.map((c) => c.id);
      set({ selectedCartridges: availableIds });
    } else {
      set({ selectedCartridges: [] });
    }
  },
  handleCartridgeSelect: (cartridgeId, checked) => {
    if (checked) {
      set((state) => ({
        selectedCartridges: [...state.selectedCartridges, cartridgeId],
      }));
    } else {
      set((state) => ({
        selectedCartridges: state.selectedCartridges.filter((id) => id !== cartridgeId),
      }));
    }
  },
  cleareSelectedCartridges: () => {
    set({ selectedCartridges: [] });
  },

  //
  batches: [],
  getBatchesFromDB: async () => {
    const batches = await Api.batch.getBatches();
    set({ batches });
  },
}));
