import type { H3Event } from 'h3'
import { Account, Client, Storage, TablesDB } from 'node-appwrite'

import { SESSION_COOKIE } from '../constants'

export function createAdminClient() {
  const endpoint = process.env.NUXT_PUBLIC_APPWRITE_ENDPOINT
  const project = process.env.NUXT_PUBLIC_APPWRITE_PROJECT
  const key = process.env.APPWRITE_KEY

  const missing = (
    [
      ['NUXT_PUBLIC_APPWRITE_ENDPOINT', endpoint],
      ['NUXT_PUBLIC_APPWRITE_PROJECT', project],
      ['APPWRITE_KEY', key]
    ] as const
  )
    .filter(([, value]) => !value)
    .map(([name]) => name)

  if (missing.length > 0) {
    throw createError({
      statusCode: 500,
      statusMessage: `Missing Appwrite env vars on the server: ${missing.join(', ')}`
    })
  }

  const client = new Client().setEndpoint(endpoint).setProject(project).setKey(key)

  return {
    get account() {
      return new Account(client)
    },
    get tablesDB() {
      return new TablesDB(client)
    },
    get storage() {
      return new Storage(client)
    }
  }
}

export function createSessionClient(event: H3Event) {
  const config = useRuntimeConfig(event)

  const client = new Client()
    .setEndpoint(config.public.appwriteEndpoint as string)
    .setProject(config.public.appwriteProjectId as string)

  const session = getCookie(event, SESSION_COOKIE)
  if (session) {
    client.setSession(session)
  }

  return {
    get account() {
      return new Account(client)
    }
  }
}
