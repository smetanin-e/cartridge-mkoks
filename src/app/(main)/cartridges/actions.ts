'use server';
import { prisma } from '@/shared/lib';
import { CartridgeStatus } from '@prisma/client';

export async function changeCartridgeStatus(id: number, status: CartridgeStatus) {
  try {
    const cartridge = await prisma.cartridge.findFirst({
      where: { id },
    });

    if (!cartridge) {
      return { success: false, message: 'Картридж не найден' };
    }

    if (cartridge.status === CartridgeStatus.SERVICE) {
      return {
        success: false,
        message:
          'Картридж находится в сервисе на заправке! Изменить статус картриджа можно, оформив возврат из сервиса',
      };
    }

    if (cartridge.status === CartridgeStatus.WORKING) {
      return {
        success: false,
        message:
          'Картридж находится в работе, его статус изменить нельзя! Изменить статус картриджа можно, оформив замену',
      };
    }

    await prisma.cartridge.update({
      where: { id },
      data: {
        status,
      },
    });

    return { success: true };
  } catch (error) {
    console.log('[changeCartridgeStatus] Server error', error);
    return { success: false, message: 'Ошибка на сервере' };
  }
}

export async function deletePrinter(id: number) {
  try {
    const printer = await prisma.printer.findFirst({
      where: { id },
    });
    if (!printer) {
      return { success: false, message: 'Принтер не найден' };
    }
    await prisma.printer.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.log('[deletePrinter] Server error', error);
    return { success: false, message: 'Ошибка на сервере' };
  }
}

export async function deleteCartridge(id: number) {
  try {
    const cartridge = await prisma.cartridge.findFirst({
      where: { id },
      include: { serviceBatchEntries: true, replacementInstalled: true, replacementRemoved: true },
    });
    if (!cartridge) {
      return { success: false, message: 'Картридж не найден' };
    }

    if (
      cartridge.status === CartridgeStatus.WORKING ||
      cartridge.status === CartridgeStatus.SERVICE
    ) {
      return { success: false, message: 'Удаление запрещено' };
    }

    const hasRelations =
      cartridge.replacementInstalled.length > 0 ||
      cartridge.replacementRemoved.length > 0 ||
      cartridge.serviceBatchEntries.length > 0;

    if (hasRelations) {
      return {
        success: false,
        message:
          'Невозможно удалить! Картридж учавствовал в заменах или отправлялся в сервис на заправку',
      };
    }

    await prisma.cartridge.delete({ where: { id } });

    return { success: true };
  } catch (error) {
    console.log('[deleteCartridge] Server error', error);
    return { success: false, message: 'Ошибка на сервере' };
  }
}
