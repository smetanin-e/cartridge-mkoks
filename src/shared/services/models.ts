import { Model } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import axios from 'axios';
import { useModelsStore } from '../store/cartridge-models';
import { CreateModelDTO } from './dto/cartridge-model';

export const getModels = async (): Promise<Model[]> => {
  const { data } = await axiosInstance.get<Model[]>(ApiRoutes.MODELS);
  return data;
};

export const createModel = async (values: CreateModelDTO): Promise<Model> => {
  try {
    const { data } = await axiosInstance.post<Model>('/cartridge-models', values);
    useModelsStore.getState().getModels();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка! Не удалось добавить модель.');
    }
    throw error;
  }
};
