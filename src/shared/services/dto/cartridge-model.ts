import { Cartridge, Model } from '@prisma/client';

export type CartridgeModelDTO = Model & { cartridges?: Cartridge[] };
