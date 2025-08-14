import { Printer } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { PrinterDTO } from './dto/printer.dto';

export const getPrinters = async (): Promise<PrinterDTO[]> => {
  const { data } = await axiosInstance.get<PrinterDTO[]>(ApiRoutes.PRINTERS);
  return data;
};
