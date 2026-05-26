import type { UserDBType } from '~~/server/types/auth'

export default defineEventHandler(async (event): Promise<UserDBType | null> => {
  const user = event.context.user

  if (!user) {
    return null
  }

  return user
})
