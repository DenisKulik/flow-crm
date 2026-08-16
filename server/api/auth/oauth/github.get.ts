import { OAuthProvider } from 'node-appwrite'

import { createAdminClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const appUrl = config.public.appUrl as string | undefined

  if (!appUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing NUXT_PUBLIC_APP_URL on the server'
    })
  }

  const { account } = createAdminClient()

  try {
    const url = await account.createOAuth2Token({
      provider: OAuthProvider.Github,
      success: `${appUrl}/api/auth/oauth/github/callback`,
      failure: `${appUrl}/auth?oauth=failed`
    })

    await sendRedirect(event, url)
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to initiate GitHub OAuth'
    })
  }
})
