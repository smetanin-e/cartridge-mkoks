import { NextResponse } from 'next/server';

export function setAccessTokenCookie(response: NextResponse, token: string, maxAgesSec: number) {
  console.log('setAccessTokenCookie', token);
  response.cookies.set('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: maxAgesSec,
  });
}
