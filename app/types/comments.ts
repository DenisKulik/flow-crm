import type { Models } from 'appwrite'

import type { IBaseEntity } from '@/types'

export interface IComment extends IBaseEntity {
  text: string
}

export type CommentDBType = Models.Document & IComment

export type CommentListDBType = {
  total: number
  rows: CommentDBType[]
}
