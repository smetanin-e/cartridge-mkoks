import axios from 'axios';
import { axiosInstance } from './instance';
import { Batch, ServiceBatchDTO } from './dto/service-batch.dto';
import { ApiRoutes } from './constants';
import { BatchStatus, ServiceBatch } from '@prisma/client';
import { useCartridgeStore } from '../store/cartridges';
import { useServiceBatchStore } from '../store/service-batch';

export const getBatches = async (statuses?: BatchStatus[], take?: number, skip?: number) => {
  try {
    const params = new URLSearchParams();
    if (statuses && statuses.length > 0) {
      statuses.forEach((s) => params.append('status', s));
    }
    if (take !== undefined) {
      params.append('take', take.toString());
    }

    if (skip !== undefined) {
      params.append('skip', skip.toString());
    }

    const { data } = await axiosInstance.get<Batch[]>(
      ApiRoutes.BATCH + (params.toString ? `/?${params.toString()}` : ''),
    );

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
    useServiceBatchStore.getState().getBatchesFromDB();
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
