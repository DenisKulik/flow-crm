import { DealStatus, type IColumn } from '@/types'

export const dealColumns: IColumn[] = [
  {
    id: DealStatus.todo,
    name: 'Incoming',
    cards: []
  },
  {
    id: DealStatus.toBeAgreed,
    name: 'Agreement',
    cards: []
  },
  {
    id: DealStatus.inProgress,
    name: 'In production',
    cards: []
  },
  {
    id: DealStatus.produced,
    name: 'Produced',
    cards: []
  },
  {
    id: DealStatus.done,
    name: 'For shipment',
    cards: []
  }
]
