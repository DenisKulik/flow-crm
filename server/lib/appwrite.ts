import type { H3Event } from 'h3'
import { Account, Client, Storage, TablesDB } from 'node-appwrite'

import { SESSION_COOKIE } from '../constants'

export function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NUXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NUXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.APPWRITE_KEY!)

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
