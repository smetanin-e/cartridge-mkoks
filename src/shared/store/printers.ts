import { create } from 'zustand';
import { Api } from '../services';
import { PrinterDTO } from '../services/dto/printer.dto';

interface PrinterState {
  loading: boolean;
  error: boolean;
  printers: PrinterDTO[];
  getPrinters: () => Promise<void>;
}

export const usePrintersStore = create<PrinterState>()((set) => ({
  loading: true,
  error: false,
  printers: [],
  getPrinters: async () => {
    try {
      const getPrinters = await Api.printers.getPrinters();
      set({ printers: getPrinters });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
