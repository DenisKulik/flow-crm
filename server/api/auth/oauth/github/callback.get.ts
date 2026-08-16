import { SESSION_COOKIE } from '~~/server/constants'
import { createAdminClient } from '~~/server/lib/appwrite'
import { getSessionCookieOptions } from '~~/server/lib/session-cookie'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const userId = query.userId
  const secret = query.secret

  if (!userId || !secret) {
    throw createError({ statusCode: 400, statusMessage: 'Missing userId or secret' })
  }

  const { account } = createAdminClient()

  try {
    const session = await account.createSession({
      userId: String(userId),
      secret: String(secret)
    })

    if (!session.secret) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Appwrite returned an empty session secret'
      })
    }

    setCookie(event, SESSION_COOKIE, session.secret, getSessionCookieOptions(event, session))

    await sendRedirect(event, '/')
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create OAuth session'
    })
  }
})
