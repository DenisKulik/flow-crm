import { SESSION_COOKIE } from '~~/server/constants'
import { createSessionClient } from '~~/server/lib/appwrite'
import { getSessionCookieDomain } from '~~/server/lib/session-cookie'

export default defineEventHandler(async (event) => {
  const { account } = createSessionClient(event)

  try {
    await account.deleteSessions()
  } catch {
    // Session might already be invalid — still clear the cookie
  }

  deleteCookie(event, SESSION_COOKIE, { path: '/', domain: getSessionCookieDomain() })

  return { success: true }
})
