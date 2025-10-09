import { prisma } from '@/shared/lib';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        login: true,
        surname: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('USER_GET Server error', error);
    return NextResponse.json(
      { message: 'Не удалось получить список пользователей' },
      { status: 500 },
    );
  }
}
