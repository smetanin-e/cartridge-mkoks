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

export async function deletePrinter(id: number) {
  try {
    const printer = await prisma.printer.findFirst({
      where: { id },
    });
    if (!printer) {
      throw new Error('Картридж не найден');
    }
    await prisma.printer.delete({
      where: { id },
    });
  } catch (error) {
    console.log('[deletePrinter] Server error', error);
    throw error;
  }
}
