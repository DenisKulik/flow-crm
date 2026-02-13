import { Account, Client, Storage, TablesDB } from 'appwrite'

import { APP_WRITE_ID } from '@/constants'

export const client = new Client()

client.setEndpoint('https://cloud.appwrite.io/v1').setProject(APP_WRITE_ID)

export const account = new Account(client)
export { ID } from 'appwrite'
export const DB = new TablesDB(client)
export const storage = new Storage(client)
