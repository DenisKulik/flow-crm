import { Query } from 'appwrite'
import { nanoid } from 'nanoid'

import { DB } from '@/api/appwrite'
import { COLLECTION_COMMENTS, DB_ID } from '@/constants'
import type { CommentListDBType } from '@/types'

interface ICommentService {
  getCommentsByDealId(dealId: string): Promise<CommentListDBType>
  createComment(text: string, dealId: string): Promise<void>
  deleteComment(commentId: string): Promise<void>
}

export class CommentService implements ICommentService {
  public getCommentsByDealId(dealId: string): Promise<CommentListDBType> {
    return DB.listRows({
      databaseId: DB_ID,
      tableId: COLLECTION_COMMENTS,
      queries: [Query.equal('deal', [dealId])]
    })
  }

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

  public async deleteComment(commentId: string): Promise<void> {
    await DB.deleteRow({
      databaseId: DB_ID,
      tableId: COLLECTION_COMMENTS,
      rowId: commentId
    })
  }
}
