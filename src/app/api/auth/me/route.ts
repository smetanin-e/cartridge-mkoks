import { setAccessTokenCookie } from '@/shared/lib/auth/set-access-token-cookie';
import { generateAccessToken } from '@/shared/services/auth/token-sevice';
import { validateRefreshToken } from '@/shared/services/auth/validate-refresh-token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    //Получаем refresh токен из куки
    const token = req.cookies.get('refresh_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'refresh токен отсутствует' }, { status: 401 });
    }

    const user = await validateRefreshToken(token);

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не авторизован' }, { status: 401 });
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
    });

    const response = NextResponse.json({ success: true, accessToken });
    const maxAge = 60 * 15;
    setAccessTokenCookie(response, accessToken, maxAge);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}
