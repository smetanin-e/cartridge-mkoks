'use server';
import { prisma } from '@/shared/lib';
import { CartridgeStatus } from '@prisma/client';

export async function batchCancel(id: string, cartridgeIds: number[]) {
  try {
    const batch = await prisma.serviceBatch.findFirst({ where: { id } });
    if (!batch) {
      return { success: false, message: 'Партия не найдена' };
    }

    if (cartridgeIds.length === 0) {
      return { success: false, message: 'Отсутствуют картриджи для отмены' };
    }

    await prisma.serviceBatchCartridge.deleteMany({
      where: { serviceBatchId: id },
    });

    await prisma.serviceBatch.delete({ where: { id } });

    await prisma.cartridge.updateMany({
      where: { id: { in: cartridgeIds } },
      data: { status: CartridgeStatus.REFILL },
    });

    return { success: true };
  } catch (error) {
    console.log('[batchCancel] Server error', error);
    return { success: false, message: 'Ошибка на сервере' };
  }
}
