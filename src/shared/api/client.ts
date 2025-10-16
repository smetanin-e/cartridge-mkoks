import createClient, { Middleware } from 'openapi-fetch';
import { paths } from './api-schema';
import { cookies } from 'next/headers';

const authMiddleware: Middleware = {
  async onRequest({ request }) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    if (accessToken) {
      request.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return request;
  },
  onResponse({ response }) {
    if (!response.ok) {
      throw new Error(`${response.url}: ${response.status} ${response.statusText}`);
    }
  },
};

export const client = createClient<paths>({
  baseUrl: process.env.API_URL_SERVER,
  headers: { 'api-key': process.env.API_KEY },
});

client.use(authMiddleware);
