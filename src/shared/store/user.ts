import { create } from 'zustand';
import { getMe } from '../services/auth/get-me';
import { refreshAccessToken } from '../services/auth/refresh-access-token';

interface UserAuthState {
  //=======Авторизированный пользователь==============
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
  initUser: () => Promise<void>;
}

export const useUserStore = create<UserAuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  initUser: async () => {
    try {
      const me = await getMe();
      if (me) {
        set({ user: me, loading: false });
      }
      await refreshAccessToken();
      const meAfterRefresh = await getMe();
      set({ user: meAfterRefresh, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
}));
