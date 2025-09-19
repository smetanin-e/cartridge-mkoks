'use server';

import { prisma } from '@/shared/lib';
import { ReturnCartrige } from '@/shared/services/dto/service-batch.dto';
import { BatchStatus, CartridgeStatus } from '@prisma/client';

export async function returnCartriges(data: ReturnCartrige) {
  try {
    await prisma.serviceBatchCartridge.updateMany({
      where: { cartridgeId: { in: data.cartridges } },
      data: {
        returned: true,
        returnDate: data.date,
        returnResponsible: data.responsible,
        returnNotes: data.notes,
      },
    });

    await prisma.cartridge.updateMany({
      where: { id: { in: data.cartridges } },
      data: { status: CartridgeStatus.AVAILABLE },
    });

    const cartridgesInBatch = await prisma.serviceBatchCartridge.findMany({
      where: { serviceBatchId: data.batchId },
    });
    if (!cartridgesInBatch) {
      throw new Error('Картриджи для возврата не найдены');
    }

    const allReturned = cartridgesInBatch.every((c) => c.returned);
    const someReturned = cartridgesInBatch.some((c) => c.returned);

    console.log('allReturned=', allReturned);
    console.log('someReturned=', someReturned);
    let newStatus: BatchStatus | null = null;

    if (allReturned) {
      newStatus = BatchStatus.COMPLITED;
    } else if (someReturned) {
      newStatus = BatchStatus.PARTIAL_RETURN;
    }

    if (newStatus) {
      await prisma.serviceBatch.update({
        where: { id: data.batchId },
        data: { status: newStatus, partialReturnDate: data.date },
      });
    }
  } catch (error) {
    console.log('[ReturnCartriges] Server error', error);
  }
}
