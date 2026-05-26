import { SESSION_COOKIE } from '~~/server/constants'
import { createAdminClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body || {}

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const { account } = createAdminClient()

  try {
    const session = await account.createEmailPasswordSession({
      email,
      password
    })

    setCookie(event, SESSION_COOKIE, session.secret, {
      expires: new Date(session.expire),
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    })

    return { success: true }
  } catch {
    throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
  }
})
