import { COLLECTION_DEALS, DB_ID } from '~~/server/constants'
import { createAdminClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Deal ID is required' })
  }

  const { tablesDB } = createAdminClient()

  return await tablesDB.getRow({
    databaseId: DB_ID,
    tableId: COLLECTION_DEALS,
    rowId: id
  })
})
