import { prisma } from '@/shared/lib';
import { CreateModelDTO } from '@/shared/services/dto/cartridge-model.dto.';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const models = await prisma.model.findMany({
      include: { cartridges: true },
    });
    return NextResponse.json(models);
  } catch (error) {
    console.error('MODEL_CARTRIDGE_GET Server error', error);
    return NextResponse.json({ message: 'Не удалось получить модели картриджей' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as CreateModelDTO;
    const findModel = await prisma.model.findFirst({
      where: { model: data.model },
    });

    if (findModel) {
      return NextResponse.json({ error: 'Такая модель уже существует в базе' }, { status: 400 });
    }

    const model = await prisma.model.create({
      data,
    });

    return NextResponse.json(model);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('CARTRIDGE_MODELS_POST Server error', error);
    return NextResponse.json({ message: 'Не удалось добавить модель' }, { status: 500 });
  }
}
