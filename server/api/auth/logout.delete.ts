import { SESSION_COOKIE } from '~~/server/constants'
import { createSessionClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async (event) => {
  const { account } = createSessionClient(event)

  try {
    await account.deleteSessions()
  } catch {
    // Session might already be invalid — still clear the cookie
  }

  deleteCookie(event, SESSION_COOKIE, { path: '/' })

  return { success: true }
})
