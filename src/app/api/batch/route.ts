import { prisma } from '@/shared/lib';
import { ServiceBatchDTO } from '@/shared/services/dto/service-batch.dto';
import { CartridgeStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const batchesRaw = await prisma.serviceBatch.findMany({
    select: {
      id: true,
      date: true,
      responsible: true,
      cartridgesInBatch: { select: { cartridge: true } },
    },
  });

  const batches = batchesRaw.map((batch) => ({
    id: batch.id,
    date: batch.date,
    responsible: batch.responsible,
    cartridges: batch.cartridgesInBatch.map((cb) => cb.cartridge),
  }));

  return NextResponse.json(batches);
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as ServiceBatchDTO;

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
