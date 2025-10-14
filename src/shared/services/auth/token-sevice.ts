import { SignJWT, jwtVerify } from 'jose';

import { User, UserRole } from '@prisma/client';
import { prisma } from '@/shared/lib/prisma-client';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

if (!JWT_SECRET) {
  throw new Error('❌ JWT_SECRET is undefined! Убедись, что он задан в .env');
}

//Генерация Access токена
export async function generateAccessToken(payload: { userId: number; role: UserRole }) {
  const token = await new SignJWT({
    ...payload,
    jti: crypto.randomUUID(),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(JWT_SECRET);
  return token;
}

//Генерация Refresh токена
export function generateRefreshToken() {
  return crypto.randomUUID() + crypto.randomUUID();
}

type JwtPayload = {
  userId: string;
  role: UserRole;
};

export async function getUserFromAccessToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const userId = Number(payload.userId);
    if (!userId) return null;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('[getUserFromAccessToken]', error);
    return null;
  }
}
