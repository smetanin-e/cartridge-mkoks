import { create } from 'zustand';
import { CartridgeDTO } from '../services/dto/cartridge-model.dto.';
import { Api } from '../services';

interface CartrigesState {
  loading: boolean;
  error: boolean;
  cartridges: CartridgeDTO[];
  getCartriges: () => Promise<void>;
}

export const useCartridgeStore = create<CartrigesState>()((set) => ({
  loading: true,
  error: false,
  cartridges: [],
  getCartriges: async () => {
    try {
      const data = await Api.cartridges.getCartridges();
      set({ cartridges: data });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
