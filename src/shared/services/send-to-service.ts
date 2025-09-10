import axios from 'axios';
import { axiosInstance } from './instance';
import { ServiceButchDTO } from './dto/service-batch.dto';
import { ApiRoutes } from './constants';
import { ServiceBatch } from '@prisma/client';
import { useCartridgeStore } from '../store/cartridges';

export const sendToService = async (value: ServiceButchDTO): Promise<ServiceBatch> => {
  try {
    const { data } = await axiosInstance.post<ServiceBatch>(ApiRoutes.SEND_TO_SERVICE, value);
    useCartridgeStore.getState().getCartriges();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || 'Ошибка получения данных о заменах картриджей',
      );
    }
    throw error;
  }
};
