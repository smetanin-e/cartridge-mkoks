import { createUserSchema, updateUserSchema } from '@/shared/schemas/auth/create-user-schema';
import { createUser, updateUser } from '@/shared/services/auth/auth-service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = createUserSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Невалидные данные' }, { status: 400 });
    }

    const user = await createUser(result.data);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    return NextResponse.json({ error: 'Что-то пошло не так' }, { status: 500 });
  }
}
//TODO ПЕРЕДЕЛАТЬ В СЕРВЕРНЫЙ ЭКШН
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const result = updateUserSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: 'Невалидные данные' }, { status: 400 });
    }

    const user = await updateUser(result.data);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Ошибка при обновлении данных:', error);
    return NextResponse.json({ error: 'Что-то пошло не так' }, { status: 500 });
  }
}
