import { nanoid } from 'nanoid'

import { STORAGE_ID } from '~~/server/constants'
import { createAdminClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  const fileField = formData?.find((item) => item.name === 'file')

  if (!fileField || !fileField.data || fileField.data.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'File is required' })
  }

  const filename = fileField.filename || 'upload'
  const fileId = nanoid()
  const file = new File([new Uint8Array(fileField.data)], filename, { type: fileField.type })

  const { storage } = createAdminClient()

  const result = await storage.createFile({
    bucketId: STORAGE_ID,
    fileId,
    file
  })

  return result
})
