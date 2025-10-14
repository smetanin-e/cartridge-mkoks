'use server';

import { prisma } from '@/shared/lib';
import { CartridgeStatus } from '@prisma/client';

export async function removeReplace(id: number) {
  try {
    const replacement = await prisma.replacement.findFirst({
      where: { id },
    });
    if (!replacement) return { error: 'Запись о замене картриджа не найдена' };

    const { installedCartridgeNumber, removedCartridgeNumber, createdAt } = replacement;
    const installed = installedCartridgeNumber ? installedCartridgeNumber : 'not installed';
    const removed = removedCartridgeNumber ? removedCartridgeNumber : 'not installed';

    const usedAfter = await prisma.replacement.findFirst({
      where: {
        id: { not: id },
        AND: [
          {
            createdAt: { gt: createdAt },
            OR: [
              { installedCartridgeNumber: installed || removed },
              { removedCartridgeNumber: installed || removed },
            ],
          },
        ],
      },
    });

    if (usedAfter) {
      return { error: 'Невозможно удалить запись' };
    }

    //!========================================================
    //!Исправить этот код при изменении архитектуры
    const removedCartridge = await prisma.cartridge.findUnique({ where: { number: removed } });
    console.log('removedCartridge', removedCartridge);
    if (!removedCartridge) return { error: 'Снятый картридж отсутствует' };
    if (removedCartridge.status !== CartridgeStatus.REFILL)
      return { error: 'Невозможно удалить запись' };
    //!========================================================

    await prisma.replacement.delete({ where: { id } });

    if (installedCartridgeNumber) {
      await prisma.cartridge.update({
        where: { number: installedCartridgeNumber },
        data: { status: CartridgeStatus.AVAILABLE },
      });
    }

    if (removedCartridgeNumber) {
      await prisma.cartridge.update({
        where: { number: removedCartridgeNumber },
        data: { status: CartridgeStatus.WORKING },
      });
    }

    return { success: true };
  } catch (error) {
    console.log('[removeReplace] Server error', error);
    throw error;
  }
}
