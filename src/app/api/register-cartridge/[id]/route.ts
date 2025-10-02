import { prisma } from '@/shared/lib';
import { CartridgeStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const cartridgeId = Number(id);
    const data = (await req.json()) as { status: CartridgeStatus };

    const cartridge = await prisma.cartridge.findFirst({
      where: { id: cartridgeId },
    });

    if (!cartridge) {
      return NextResponse.json({ error: 'Картридж не найден' }, { status: 400 });
    }

    const updated = await prisma.cartridge.update({
      where: { id: cartridgeId },
      data: {
        status: data.status,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('REGISTER_CARTRIDGE[ID]_PATCH Server error', error);
    return NextResponse.json({ message: 'Не удалось обновить статус картриджа' }, { status: 500 });
  }
}
