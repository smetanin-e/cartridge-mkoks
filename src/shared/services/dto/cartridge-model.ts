import { Cartridge, Model } from '@prisma/client';

export type CartridgeModelDTO = Model & { cartridges?: Cartridge[] };

export type CreateModelDTO = {
  model: string;
};
