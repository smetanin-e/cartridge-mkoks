import { Cartridge } from '@prisma/client';
import axios from 'axios';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { CartridgeDTO } from './dto/cartridge-model.dto.';
import { useCartridgeStore } from '../store/cartridges';

export const registerCartridge = async (values: Omit<Cartridge, 'id'>): Promise<Cartridge> => {
  try {
    const { data } = await axiosInstance.post<Cartridge>('/register-cartridge', values);
    useCartridgeStore.getState().getCartriges();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка регистрации картриджа');
    }
    throw error;
  }
};

export const getCartridges = async (): Promise<CartridgeDTO[]> => {
  try {
    const { data } = await axiosInstance.get<CartridgeDTO[]>(ApiRoutes.CARTRIDGES);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка получения картриджей');
    }
    throw error;
  }
};
