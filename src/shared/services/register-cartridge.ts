import { Cartridge } from '@prisma/client';
import axios from 'axios';
import { axiosInstance } from './instance';

export const registerCartridge = async (values: Omit<Cartridge, 'id'>): Promise<Cartridge> => {
  try {
    const { data } = await axiosInstance.post<Cartridge>('/register-cartridge', values);
    //ДОБАВИТЬ - ОБНОВИТЬ СТОР С КАРТРИДЖАМИ
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка регистрации картриджа');
    }
    throw error;
  }
};
