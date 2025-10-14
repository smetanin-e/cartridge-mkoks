import { setAccessTokenCookie } from '@/shared/lib/auth/set-access-token-cookie';
import { setRefreshTokenCookie } from '@/shared/lib/auth/set-refresh-token-cookie';
import { generateAccessToken } from '@/shared/services/auth/token-sevice';
import { validateRefreshToken } from '@/shared/services/auth/validate-refresh-token';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    //Получаем refresh токен из куки
    const refreshToken = req.cookies.get('refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'refresh токен отсутствует' }, { status: 401 });
    }

    const user = await validateRefreshToken(refreshToken);

    if (!user) {
      return NextResponse.json({ error: 'Пользователь не авторизован' }, { status: 401 });
    }

    const accessToken = await generateAccessToken({
      userId: user.id,
      role: user.role,
    });
    const refreshTokenMaxAge = 60 * 60 * 24 * 7;
    const accessTokenMaxAge = 60 * 15; // 15 минут
    const response = NextResponse.json({ success: true, accessToken });

    setRefreshTokenCookie(response, refreshToken, refreshTokenMaxAge);
    setAccessTokenCookie(response, accessToken, accessTokenMaxAge);

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}
