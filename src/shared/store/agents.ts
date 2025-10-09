import { create } from 'zustand';
import { Agent } from '../services/dto/agent.dto';
import { Api } from '../services';

interface UserAgentState {
  //=======Список пользователей ==============
  agents: Agent[];
  loadingItems: boolean;
  error: boolean;
  getAgents: () => Promise<void>;
}

export const useAgentStore = create<UserAgentState>((set) => ({
  agents: [],
  loadingItems: true,
  error: false,
  getAgents: async () => {
    try {
      const agents = await Api.agent.getAgents();
      set({ agents });
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loadingItems: false });
    }
  },
}));
