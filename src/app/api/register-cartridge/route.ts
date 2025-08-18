import { prisma } from '@/shared/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const findCartridge = await prisma.cartridge.findFirst({
      where: { number: data.number },
    });

    if (findCartridge) {
      return NextResponse.json({ error: 'Такой номер уже используется в базе' }, { status: 400 });
    }

    const cartridge = await prisma.cartridge.create({
      data,
    });

    return NextResponse.json(cartridge);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('REGISTER_CARTRIDGE_POST Server error', error);
    return NextResponse.json({ message: 'Не удалось зарегистрировать картридж' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = await prisma.cartridge.findMany({
      include: {
        model: true,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('REGISTER_CARTRIDGE__GET Server error', error);
    return NextResponse.json({ message: 'Не удалось получить список картриджей' }, { status: 500 });
  }
}
