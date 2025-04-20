import type { DealStatus } from './deal'

export interface ICard {
  id: string
  name: string
  price: string
  createdAt: string
  companyName: string
  status: string
}

export interface IColumn {
  id: DealStatus
  name: string
  cards: ICard[]
}
