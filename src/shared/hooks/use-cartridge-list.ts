import { CartridgeStatus } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { Api } from '../services';
import { CartridgeDTO } from '../services/dto/cartridge-model.dto.';

export const useCartridgeList = (status?: CartridgeStatus) => {
  const query = useQuery<CartridgeDTO[]>({
    queryKey: ['cartridges', status],
    queryFn: async () => {
      const res = await Api.cartridges.getCartridges(status);
      return res;
    },
  });

  const cartridges = query.data ?? [];

  return {
    cartridges,
    loadingInitial: query.isLoading,
    loadCartridges: query.refetch,
    refetch: query.refetch,
  };
};
