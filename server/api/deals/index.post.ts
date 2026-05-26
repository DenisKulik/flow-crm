import { nanoid } from 'nanoid'

import { COLLECTION_DEALS, DB_ID } from '~~/server/constants'
import { createAdminClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body) {
    throw createError({ statusCode: 400, statusMessage: 'Deal data is required' })
  }

  const { tablesDB } = createAdminClient()
  const dealId = nanoid()

  await tablesDB.createRow({
    databaseId: DB_ID,
    tableId: COLLECTION_DEALS,
    rowId: dealId,
    data: body
  })

  return { success: true }
})
