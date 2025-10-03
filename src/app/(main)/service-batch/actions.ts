'use server';
import { prisma } from '@/shared/lib';
import { CartridgeStatus } from '@prisma/client';

export async function batchCancel(id: string, cartridgeIds: number[]) {
  try {
    const batch = await prisma.serviceBatch.findFirst({ where: { id } });
    if (!batch) {
      throw new Error('Партия не найдена');
    }

    if (cartridgeIds.length === 0) {
      throw new Error('Отсутствуют картриджи для отмены');
    }

    await prisma.serviceBatchCartridge.deleteMany({
      where: { serviceBatchId: id },
    });

    await prisma.serviceBatch.delete({ where: { id } });

    await prisma.cartridge.updateMany({
      where: { id: { in: cartridgeIds } },
      data: { status: CartridgeStatus.REFILL },
    });
  } catch (error) {
    console.log('[batchCancel] Server error', error);
    throw error;
  }
}
