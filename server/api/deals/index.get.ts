import { COLLECTION_DEALS, DB_ID } from '~~/server/constants'
import { createAdminClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async () => {
  const { tablesDB } = createAdminClient()

  const response = await tablesDB.listRows({
    databaseId: DB_ID,
    tableId: COLLECTION_DEALS
  })

  return {
    total: response.total,
    rows: response.rows
  }
})
