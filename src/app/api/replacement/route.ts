import { prisma } from '@/shared/lib';
import { ReplacementFormType } from '@/shared/schemas/replacement-schema';
import { CartridgeStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const take = searchParams.get('take') ? parseInt(searchParams.get('take')!, 10) : undefined;
    const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip')!, 10) : undefined;
    const search = searchParams.get('search') || '';

    const replacements = await prisma.replacement.findMany({
      where: search
        ? {
            OR: [
              { installedCartridgeNumber: { contains: search, mode: 'insensitive' } },
              { removedCartridgeNumber: { contains: search, mode: 'insensitive' } },
              { departament: { name: { contains: search, mode: 'insensitive' } } },
            ],
          }
        : {},
      include: {
        departament: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });

    return NextResponse.json(replacements);
  } catch (error) {
    console.error('REPLACEMENTS_GET Server error', error);
    return NextResponse.json(
      { message: 'Не удалось получить список замены картриджей' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as ReplacementFormType;

    if (!data.installedCartridge && !data.removedCartridge) {
      return NextResponse.json(
        { error: 'Нельзя заменить "НИЧЕГО" на "НИЧЕГО"!!!' },
        { status: 400 },
      );
    }

    let installedNumber: string | null = null;
    let removedNumber: string | null = null;

    if (data.installedCartridge !== null) {
      const installed = await prisma.cartridge.update({
        where: { id: data.installedCartridge },
        data: { status: CartridgeStatus.WORKING },
      });
      installedNumber = installed.number;
    }

    if (data.removedCartridge !== null) {
      const removed = await prisma.cartridge.update({
        where: { id: data.removedCartridge },
        data: { status: CartridgeStatus.REFILL },
      });
      removedNumber = removed.number;
    }

    const replace = await prisma.replacement.create({
      data: {
        date: data.date,
        departamentId: data.departamentId,
        installedCartridgeNumber: installedNumber,
        removedCartridgeNumber: removedNumber,
        responsible: data.responsible,
      },
    });

    return NextResponse.json(replace);
  } catch (error) {
    console.error('REPLACEMENTS_POST Server error', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return NextResponse.json(
      { message: 'Не удалось создать запись замены картриджа' },
      { status: 500 },
    );
  }
}
