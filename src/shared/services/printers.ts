import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { CreatePrinterDTO, PrinterDTO } from './dto/printer.dto';
import { Printer } from '@prisma/client';
import axios from 'axios';
import { usePrintersStore } from '../store/printers';

export const getPrinters = async (): Promise<PrinterDTO[]> => {
  const { data } = await axiosInstance.get<PrinterDTO[]>(ApiRoutes.PRINTERS);
  return data;
};

export const registerPrinter = async (value: CreatePrinterDTO): Promise<Printer> => {
  try {
    const { data } = await axiosInstance.post<Printer>(ApiRoutes.PRINTERS, value);
    usePrintersStore.getState().getPrinters();
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Ошибка! Не удалось добавить принтер.');
    }
    throw error;
  }
};
