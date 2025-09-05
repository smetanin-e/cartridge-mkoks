import { Replacement } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { ReplacementFormType } from '../schemas/replacement-schema';
import axios from 'axios';

import { ReplacementsDTO } from './dto/replacements.dto';
import { useReplacementStore } from '../store/replacement';

export const getReplacements = async () => {
  try {
    const { data } = await axiosInstance.get<ReplacementsDTO[]>(ApiRoutes.REPLACEMENT);
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

export const replacing = async (value: ReplacementFormType): Promise<Replacement> => {
  try {
    const { data } = await axiosInstance.post<Replacement>(ApiRoutes.REPLACEMENT, value);
    useReplacementStore.getState().getReplacements();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка регистрации картриджа');
    }
    throw error;
  }
};
