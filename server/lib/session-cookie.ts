import type { H3Event } from 'h3'
import { getRequestProtocol } from 'h3'
import type { Models } from 'node-appwrite'

export function getSessionCookieOptions(event: H3Event, session: Models.Session) {
  const isHttps = getRequestProtocol(event) === 'https'

  return {
    path: '/',
    httpOnly: true,
    secure: isHttps,
    sameSite: 'lax' as const,
    expires: new Date(session.expire)
  }
}
