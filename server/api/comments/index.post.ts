import { nanoid } from 'nanoid'

import { COLLECTION_COMMENTS, DB_ID } from '~~/server/constants'
import { createAdminClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body || !body.text || !body.deal) {
    throw createError({ statusCode: 400, statusMessage: 'text and deal are required' })
  }

  const { tablesDB } = createAdminClient()

  await tablesDB.createRow({
    databaseId: DB_ID,
    tableId: COLLECTION_COMMENTS,
    rowId: nanoid(),
    data: {
      text: body.text,
      deal: body.deal
    }
  })

  return { success: true }
})
