import type { DealStatus } from './deals'

export interface ICard {
  id: string
  name: string
  price: string
  createdAt: string
  companyName: string
  status: string
}

export interface IColumn {
  status: DealStatus
  name: string
  cards: ICard[]
}
