import { prisma } from '@/shared/lib';
import { ServiceButchDTO } from '@/shared/services/dto/service-batch.dto';
import { CartridgeStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as ServiceButchDTO;

    const serviceBatch = await prisma.serviceBatch.create({
      data: {
        date: data.date,
        notes: data.notes,
        responsible: data.responsible,
        cartridgesInBatch: {
          create: data.cartridges.map((cartridgeId) => ({
            cartridge: { connect: { id: cartridgeId } },
          })),
        },
      },
      include: {
        cartridgesInBatch: true,
      },
    });

    await prisma.cartridge.updateMany({
      where: { id: { in: data.cartridges } },
      data: { status: CartridgeStatus.SERVICE },
    });

    return NextResponse.json(serviceBatch);
  } catch (error) {
    console.error('SERVICE_BATCH_POST Server error', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
  }
}
