import { nanoid } from 'nanoid'

import { DB } from '@/api/appwrite'
import { COLLECTION_COMMENTS, DB_ID } from '~/constants'

interface ICommentService {
  createComment(text: string, dealId: string): Promise<void>
}

export class CommentService implements ICommentService {
  public async createComment(text: string, deal: string): Promise<void> {
    await DB.createRow({
      databaseId: DB_ID,
      tableId: COLLECTION_COMMENTS,
      rowId: nanoid(),
      data: {
        text,
        deal
      }
    })
  }
}
