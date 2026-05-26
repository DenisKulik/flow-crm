import { COLLECTION_COMMENTS, DB_ID } from '~~/server/constants'
import { createAdminClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async (event) => {
  const commentId = getRouterParam(event, 'id')

  if (!commentId) {
    throw createError({ statusCode: 400, statusMessage: 'Comment ID is required' })
  }

  const { tablesDB } = createAdminClient()

  await tablesDB.deleteRow({
    databaseId: DB_ID,
    tableId: COLLECTION_COMMENTS,
    rowId: commentId
  })

  return { success: true }
})
