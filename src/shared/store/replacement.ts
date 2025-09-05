import { create } from 'zustand';
import { ReplacementsDTO } from '../services/dto/replacements.dto';
import { Api } from '../services';

interface ReplacementState {
  loading: boolean;
  error: boolean;
  replacements: ReplacementsDTO[];
  getReplacements: () => Promise<void>;
}

export const useReplacementStore = create<ReplacementState>()((set) => ({
  loading: true,
  error: false,
  replacements: [],
  getReplacements: async () => {
    try {
      const getReplacement = await Api.replacement.getReplacements();
      set({ replacements: getReplacement });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
