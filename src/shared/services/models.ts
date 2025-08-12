import { Model } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { CreateModel } from './dto/cartridge-model';
import axios from 'axios';
import { useModelsStore } from '../store/cartridge-models';

export const getModels = async (): Promise<Model[]> => {
  const { data } = await axiosInstance.get<Model[]>(ApiRoutes.MODELS);
  return data;
};

export const createModel = async (values: CreateModel): Promise<Model> => {
  try {
    const { data } = await axiosInstance.post<Model>('/cartridgemodels', values);
    useModelsStore.getState().getModels();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка');
    }
    throw error;
  }
};
