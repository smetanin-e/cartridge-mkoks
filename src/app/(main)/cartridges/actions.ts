'use server';
import { prisma } from '@/shared/lib';
import { CartridgeStatus } from '@prisma/client';

export async function changeCartridgeStatus(id: number, status: CartridgeStatus) {
  try {
    const cartridge = await prisma.cartridge.findFirst({
      where: { id },
    });

    if (!cartridge) {
      throw new Error('Картридж не найден');
    }

    await prisma.cartridge.update({
      where: { id },
      data: {
        status,
      },
    });
  } catch (error) {
    console.log('[changeCartridgeStatus] Server error', error);
    throw error;
  }
}
