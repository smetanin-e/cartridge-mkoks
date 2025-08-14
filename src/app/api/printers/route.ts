import { prisma } from '@/shared/lib';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const printers = await prisma.printer.findMany({
      include: {
        models: true,
      },
    });
    return NextResponse.json(printers);
  } catch (error) {
    console.error('PRINTERS_GET Server error', error);
    return NextResponse.json({ message: 'Не удалось получить список принтеров' }, { status: 500 });
  }
}
