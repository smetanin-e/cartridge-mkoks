import { prisma } from '@/shared/lib';
import { CreatePrinterDTO } from '@/shared/services/dto/printer.dto';
import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as CreatePrinterDTO;
    const findPrinter = await prisma.printer.findFirst({
      where: { name: data.name },
    });

    if (findPrinter) {
      return NextResponse.json({ error: 'Такой принтер уже существует в базе' }, { status: 400 });
    }

    const printer = await prisma.printer.create({
      data: {
        name: data.name,
        models: {
          connect: data.models,
        },
      },
    });

    return NextResponse.json(printer);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('PRINTER_POST Server error', error);
    return NextResponse.json({ message: 'Не удалось добавить принтер' }, { status: 500 });
  }
}
