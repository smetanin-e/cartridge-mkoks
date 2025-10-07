import { PrinterDTO } from '../services/dto/printer.dto';

export const searchPrinterFilter = (printers: PrinterDTO[], searchValue: string) => {
  return printers.filter((printer) => {
    const matchesName = printer.name.toLowerCase().includes(searchValue.toLowerCase());

    const matchesModels = printer.models?.some((model) =>
      model.model.toLowerCase().includes(searchValue.toLowerCase()),
    );
    return matchesName || matchesModels;
  });
};
