import type { Models } from 'appwrite'

import type { IBaseEntity } from '.'
import type { ICustomer } from './customers'

export interface IComment extends IBaseEntity {
  text: string
}

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
  documents: DealDBType[]
}

export interface IDealForm extends Omit<IDeal, 'customer' | 'comments'> {
  customer: {
    name: string
    email: string
  }
}
