import { Query } from 'node-appwrite'

import { COLLECTION_COMMENTS, DB_ID } from '~~/server/constants'
import { createAdminClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async (event) => {
  const dealId = getRouterParam(event, 'id')

  if (!dealId) {
    throw createError({ statusCode: 400, statusMessage: 'Deal ID is required' })
  }

  const { tablesDB } = createAdminClient()

  const response = await tablesDB.listRows({
    databaseId: DB_ID,
    tableId: COLLECTION_COMMENTS,
    queries: [Query.equal('deal', [dealId])]
  })

  return {
    total: response.total,
    rows: response.rows
  }
})
