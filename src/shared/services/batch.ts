import axios from 'axios';
import { axiosInstance } from './instance';
import { Batch, ServiceBatchDTO } from './dto/service-batch.dto';
import { ApiRoutes } from './constants';
import { ServiceBatch } from '@prisma/client';
import { useCartridgeStore } from '../store/cartridges';

export const getBatches = async () => {
  try {
    const { data } = await axiosInstance.get<Batch[]>(ApiRoutes.BATCH);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || 'Ошибка получения отправленных в заправку партий',
      );
    }
    throw error;
  }
};

export const sendToService = async (value: ServiceBatchDTO): Promise<ServiceBatch> => {
  try {
    const { data } = await axiosInstance.post<ServiceBatch>(ApiRoutes.BATCH, value);
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
