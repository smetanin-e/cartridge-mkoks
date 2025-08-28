import { prisma } from '@/shared/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const departaments = await prisma.departament.findMany();
    return NextResponse.json(departaments);
  } catch (error) {
    console.error('DEPARTAMENT_GET Server error', error);
    return NextResponse.json(
      { message: 'Не удалось получить список подразделений' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const findDepartament = await prisma.departament.findFirst({
      where: { name: data.name },
    });

    if (findDepartament) {
      return NextResponse.json(
        { error: 'Такое подразделение уже существует в базе' },
        { status: 400 },
      );
    }

    const departament = await prisma.departament.create({
      data,
    });

    return NextResponse.json(departament);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('DEPARTAMENT_POST Server error', error);
    return NextResponse.json({ message: 'Не удалось добавить подразделение' }, { status: 500 });
  }
}
