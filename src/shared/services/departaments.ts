import { Departament } from '@prisma/client';
import axios from 'axios';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { CreateDepartamentlDTO } from './dto/departament.dto';
import { useDepartamentStore } from '../store/departaments';

export const getDepartaments = async (): Promise<Departament[]> => {
  try {
    const { data } = await axiosInstance.get<Departament[]>(ApiRoutes.DEPARTAMENT);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error || 'Ошибка! Не удалось получить список подразделений.',
      );
    }
    throw error;
  }
};

export const createDepartament = async (values: CreateDepartamentlDTO): Promise<Departament> => {
  try {
    const { data } = await axiosInstance.post<Departament>(ApiRoutes.DEPARTAMENT, values);
    useDepartamentStore.getState().getDepartaments();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка! Не удалось добавить подразделение.');
    }
    throw error;
  }
};
