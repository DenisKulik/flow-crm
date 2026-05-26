import { createAdminClient } from '~~/server/lib/appwrite'

export default defineEventHandler(async (event) => {
  const bucketId = getRouterParam(event, 'bucketId')
  const fileId = getRouterParam(event, 'fileId')

  if (!bucketId || !fileId) {
    throw createError({ statusCode: 400, statusMessage: 'bucketId and fileId are required' })
  }

  const { storage } = createAdminClient()

  try {
    const fileInfo = await storage.getFile({ bucketId, fileId })
    const arrayBuffer = await storage.getFileDownload({ bucketId, fileId })

    setHeader(event, 'Content-Type', fileInfo.mimeType || 'application/octet-stream')
    setHeader(event, 'Content-Disposition', 'inline')
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

    return Buffer.from(arrayBuffer)
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }
})
