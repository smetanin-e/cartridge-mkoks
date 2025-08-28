import { Departament } from '@prisma/client';
import { create } from 'zustand';
import { Api } from '../services';

interface DepartamentState {
  loading: boolean;
  error: boolean;
  departaments: Departament[];
  getDepartaments: () => Promise<void>;
}

export const useDepartamentStore = create<DepartamentState>()((set) => ({
  loading: true,
  error: false,
  departaments: [],
  getDepartaments: async () => {
    try {
      const getDepartaments = await Api.departaments.getDepartaments();
      set({ departaments: getDepartaments });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
