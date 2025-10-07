import { CartridgeStatus } from '@prisma/client';
import { CartridgeDTO } from '../services/dto/cartridge-model.dto.';

type Status = CartridgeStatus | 'all';

export const searchCartridgesFilter = (
  cartridges: CartridgeDTO[],
  searchValue: string,
  statusFilter: Status,
) => {
  return cartridges.filter((cartridge) => {
    const matchesSearch =
      cartridge.number.toLowerCase().includes(searchValue.toLowerCase()) ||
      cartridge.model?.model.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = statusFilter === 'all' || cartridge.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
};
