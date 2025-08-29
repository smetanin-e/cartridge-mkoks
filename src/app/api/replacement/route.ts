import { FormReplacementType } from '@/shared/components/modals/replacement';
import { prisma } from '@/shared/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const replacements = await prisma.replacement.findMany({
      include: { departament: true },
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
    const data = (await req.json()) as FormReplacementType;
    const replace = await prisma.replacement.create({
      data: {
        date: data.date,
        departamentId: data.departamentId,
        installedCartridgeNumber: data.installedCartridge,
        removedCartridgeNumber: data.removedCartridge,
        responsible: data.responsible,
      },
    });

    if (!data.installedCartridge) {
      await prisma.cartridge.update({
        where: { number: data.installedCartridge },
        data: {},
      });
    }

    return NextResponse.json(replace);
  } catch (error) {
    console.error('REPLACEMENTS_POST Server error', error);
    return NextResponse.json(
      { message: 'Не удалось создать запись замены картриджа' },
      { status: 500 },
    );
  }
}
