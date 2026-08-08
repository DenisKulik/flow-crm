import { ID } from 'node-appwrite'

import { SESSION_COOKIE } from '~~/server/constants'
import { createAdminClient } from '~~/server/lib/appwrite'
import { getSessionCookieOptions } from '~~/server/lib/session-cookie'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body || {}

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const { account } = createAdminClient()

  try {
    await account.create({
      userId: ID.unique(),
      email,
      password
    })

    const session = await account.createEmailPasswordSession({
      email,
      password
    })

    setCookie(event, SESSION_COOKIE, session.secret, getSessionCookieOptions(event, session))

    return { success: true }
  } catch {
    throw createError({ statusCode: 409, statusMessage: 'User with this email already exists' })
  }
})
