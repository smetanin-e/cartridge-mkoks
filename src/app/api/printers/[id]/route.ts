import { prisma } from '@/shared/lib';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    const printer = await prisma.printer.delete({
      where: { id },
    });

    return NextResponse.json(printer);
  } catch (error) {
    console.error('[PRINTER_DELETE] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить принтер' }, { status: 500 });
  }
}
