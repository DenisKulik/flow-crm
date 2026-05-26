import { COLLECTION_DEALS, DB_ID } from '~~/server/constants'
import { createAdminClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Deal ID is required' })
  }

  const body = await readBody(event)

  if (!body) {
    throw createError({ statusCode: 400, statusMessage: 'Deal data is required' })
  }

  const { tablesDB } = createAdminClient()

  await tablesDB.updateRow({
    databaseId: DB_ID,
    tableId: COLLECTION_DEALS,
    rowId: id,
    data: body
  })

  return { success: true }
})
