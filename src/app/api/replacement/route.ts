import { prisma } from '@/shared/lib';
import { ReplacementFormType } from '@/shared/schemas/replacement-schema';
import { CartridgeStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const replacements = await prisma.replacement.findMany({
      include: {
        departament: true,
      },
      orderBy: { createdAt: 'desc' },
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

    if (data.installedCartridge !== null) {
      await prisma.cartridge.update({
        where: { number: data.installedCartridge },
        data: { status: CartridgeStatus.WORKING },
      });
    }

    if (data.removedCartridge !== null) {
      await prisma.cartridge.update({
        where: { number: data.removedCartridge },
        data: { status: CartridgeStatus.REFILL },
      });
    }

    const replace = await prisma.replacement.create({
      data: {
        date: data.date,
        departamentId: data.departamentId,
        installedCartridgeNumber: data.installedCartridge,
        removedCartridgeNumber: data.removedCartridge,
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
