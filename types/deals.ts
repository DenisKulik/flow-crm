import type { Models } from 'appwrite'

interface IBaseEntity {
  $id: string
  $createdAt: string
}

export interface ICustomer extends IBaseEntity {
  name: string
  email: string
  avatar_url: string
  from_source?: string
}

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
