import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { CartridgeStatus } from '@prisma/client';
import { useCartridgeStore } from '../store/cartridges';
import axios from 'axios';

export const updateCartridgeStatus = async (id: number, status: CartridgeStatus) => {
  try {
    const { data } = await axiosInstance.patch(ApiRoutes.CARTRIDGES + `/${id}`, { status });
    useCartridgeStore.getState().getCartriges();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка регистрации картриджа');
    }
    throw error;
  }
};
