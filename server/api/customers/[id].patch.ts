import { COLLECTION_CUSTOMERS, DB_ID } from '~~/server/constants'
import { createAdminClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Customer ID is required' })
  }

  const body = await readBody(event)

  if (!body) {
    throw createError({ statusCode: 400, statusMessage: 'Customer data is required' })
  }

  const { tablesDB } = createAdminClient()

  return await tablesDB.updateRow({
    databaseId: DB_ID,
    tableId: COLLECTION_CUSTOMERS,
    rowId: id,
    data: body
  })
})
