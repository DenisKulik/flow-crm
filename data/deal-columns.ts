import { DealStatus, type IColumn } from '@/types'

export const dealColumns: IColumn[] = [
  {
    status: DealStatus.todo,
    name: 'Incoming',
    cards: []
  },
  {
    status: DealStatus.toBeAgreed,
    name: 'Agreement',
    cards: []
  },
  {
    status: DealStatus.inProgress,
    name: 'In production',
    cards: []
  },
  {
    status: DealStatus.produced,
    name: 'Produced',
    cards: []
  },
  {
    status: DealStatus.done,
    name: 'For shipment',
    cards: []
  }
]
