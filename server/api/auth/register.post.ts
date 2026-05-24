import { ID } from 'node-appwrite'

import { SESSION_COOKIE } from '~~/server/constants'

import { createAdminClient } from '../../lib/appwrite'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const emailStr = email.toString()
  const passwordStr = password.toString()

  const { account } = createAdminClient()

  try {
    await account.create({
      userId: ID.unique(),
      email: emailStr,
      password: passwordStr
    })

    const session = await account.createEmailPasswordSession({
      email: emailStr,
      password: passwordStr
    })

    setCookie(event, SESSION_COOKIE, session.secret, {
      expires: new Date(session.expire),
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    })

    await sendRedirect(event, '/')
  } catch {
    throw createError({ statusCode: 409, statusMessage: 'User with this email already exists' })
  }
})
