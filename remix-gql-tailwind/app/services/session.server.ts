import { createCookieSessionStorage, Session } from 'remix';
import { auth } from './auth.server';

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: ['s3cr3t'], // TODO: replace this with an actual secret
    secure: process.env.NODE_ENV === 'production',
  },
});

export async function getSession(request: Request) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );
  return {
    session,
    getUser: async () => {
      const token = session.get(auth.sessionKey);
      if (!token) return null;
      return token;
    },
  };
}

export let { commitSession, destroySession } = sessionStorage;
