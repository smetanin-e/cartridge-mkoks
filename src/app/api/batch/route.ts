import { prisma } from '@/shared/lib';
import { ServiceBatchDTO } from '@/shared/services/dto/service-batch.dto';
import { BatchStatus, CartridgeStatus, Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const take = searchParams.get('take') ? parseInt(searchParams.get('take')!, 10) : undefined;
  const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip')!, 10) : undefined;
  const statuses = searchParams.getAll('status') as BatchStatus[];
  console.log({ statuses, take, skip }); // ПРОВЕРЬ ЧТО ПРИХОДИТ

  //Подготовка по каким параметрам будем искать партии
  const where: Prisma.ServiceBatchWhereInput = {};

  if (statuses.length > 0) {
    where.status = { in: statuses }; // фильтруем только по конкретному статусу
  }

  const batchesRaw = await prisma.serviceBatch.findMany({
    where,
    select: {
      id: true,
      date: true,
      responsible: true,
      status: true,
      partialReturnDate: true,
      cartridgesInBatch: {
        select: {
          serviceBatchId: true,
          returned: true,
          returnDate: true,
          returnResponsible: true,
          returnNotes: true,
          cartridge: {
            select: { id: true, number: true, numericNumber: true, model: true, status: true },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    skip,
    take,
  });

  const batches = batchesRaw.map((batch) => ({
    id: batch.id,
    date: batch.date,
    responsible: batch.responsible,
    status: batch.status,
    partialReturnDate: batch.partialReturnDate,
    cartridges: batch.cartridgesInBatch
      .map((cb) => ({
        ...cb.cartridge,
        returned: cb.returned,
        returnDate: cb.returnDate,
        returnResponsible: cb.returnResponsible,
        returnNotes: cb.returnNotes,
      }))
      .sort((a, b) => a.numericNumber - b.numericNumber),
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
    console.error('[SERVICE_BATCH_POST] Server error', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
  }
}
