import { Batch } from '../services/dto/service-batch.dto';

export const getCartridgeReturnInfo = (batch: Batch, cartridgeNumber: string) => {
  return batch.cartridges?.find((c) => c.number === cartridgeNumber);
};
