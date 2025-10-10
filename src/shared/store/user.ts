import { create } from 'zustand';
import { getMe } from '../services/auth/get-me';
import { refreshAccessToken } from '../services/auth/refresh-access-token';
import { AuthUser } from '../services/dto/agent.dto';

interface UserAuthState {
  //=======Авторизированный пользователь==============
  user: AuthUser | null;
  loading: boolean;
  initialized: boolean;
  setUser: (user: AuthUser | null) => void;
  initUser: () => Promise<void>;
}

export const useUserStore = create<UserAuthState>((set, get) => ({
  user: null,
  loading: true,
  initialized: false,
  setUser: (user) => set({ user }),
  initUser: async () => {
    if (get().initialized) {
      return;
    }
    set({ loading: true, initialized: true });
    try {
      let me = await getMe();
      if (!me) {
        await refreshAccessToken();
        me = await getMe();
      }

      set({ user: me, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },
}));
