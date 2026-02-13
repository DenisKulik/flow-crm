import type { Models } from 'appwrite'

import type { IBaseEntity, IComment, ICustomer } from '~/types'

export enum DealStatus {
  todo = 'todo',
  toBeAgreed = 'to-be-agreed',
  inProgress = 'in-progress',
  produced = 'produced',
  done = 'done'
}

export interface IDeal extends IBaseEntity {
  name: string
  price: number
  status: DealStatus
  customer: ICustomer
  comments: IComment[]
}

export type DealDBType = Models.Document & IDeal

export type DealListDBType = {
  total: number
  rows: DealDBType[]
}

export interface IDealForm extends Omit<IDeal, 'customer' | 'comments'> {
  customer: {
    name: string
    email: string
  }
}
