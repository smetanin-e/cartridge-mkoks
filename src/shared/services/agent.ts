import axios from 'axios';
import { ApiRoutes } from './constants';
import { Agent } from './dto/agent.dto';
import { axiosInstance } from './instance';

export const getAgents = async (): Promise<Agent[]> => {
  try {
    const { data } = await axiosInstance.get<Agent[]>(ApiRoutes.AGENTS);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || 'Ошибка! Не удалось получить список пользователей.',
      );
    }
    throw error;
  }
};
