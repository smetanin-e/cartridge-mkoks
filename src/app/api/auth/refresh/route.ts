import { setAccessTokenCookie } from '@/shared/lib/auth/set-access-token-cookie';
import { generateAccessToken } from '@/shared/services/auth/token-sevice';
import { validateRefreshToken } from '@/shared/services/auth/validate-refresh-token';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('refresh_token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'refresh токен отсутствует' }, { status: 401 });
    }

    const user = await validateRefreshToken(token);

    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
    });

    const response = NextResponse.json({ success: true, accessToken, user });
    const maxAge = 60 * 15;

    setAccessTokenCookie(response, accessToken, maxAge);

    return response;
  } catch (error) {
    //console.error('Ошибка при обновлении access token:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 401 });
  }
}
