import { Cartridge, CartridgeStatus } from '@prisma/client';
import axios from 'axios';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { CartridgeDTO } from './dto/cartridge-model.dto.';

export const registerCartridge = async (values: Omit<Cartridge, 'id'>): Promise<Cartridge> => {
  try {
    const { data } = await axiosInstance.post<Cartridge>('/register-cartridge', values);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка регистрации картриджа');
    }
    throw error;
  }
};

export const getCartridges = async (status?: CartridgeStatus): Promise<CartridgeDTO[]> => {
  try {
    const params = new URLSearchParams();
    if (status !== undefined) {
      params.append('status', status);
    }
    const { data } = await axiosInstance.get<CartridgeDTO[]>(ApiRoutes.CARTRIDGES + `/?${params}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка получения картриджей');
    }
    throw error;
  }
};
