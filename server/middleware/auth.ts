import type { Models } from 'node-appwrite'

import { createSessionClient } from '../lib/appwrite'

declare module 'h3' {
  interface H3EventContext {
    user?: Models.User<Models.Preferences>
  }
}

export default defineEventHandler(async (event) => {
  const { account } = createSessionClient(event)

  try {
    event.context.user = await account.get()
  } catch {
    // User is not authenticated — context.user stays undefined
  }
})
