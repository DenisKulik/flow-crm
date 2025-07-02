import { DEAL_STATUS_LABELS } from '@/constants'
import { DealStatus, type IColumn } from '@/types'

export const dealColumns: IColumn[] = [
  {
    status: DealStatus.todo,
    name: DEAL_STATUS_LABELS[DealStatus.todo],
    cards: []
  },
  {
    status: DealStatus.toBeAgreed,
    name: DEAL_STATUS_LABELS[DealStatus.toBeAgreed],
    cards: []
  },
  {
    status: DealStatus.inProgress,
    name: DEAL_STATUS_LABELS[DealStatus.inProgress],
    cards: []
  },
  {
    status: DealStatus.produced,
    name: DEAL_STATUS_LABELS[DealStatus.produced],
    cards: []
  },
  {
    status: DealStatus.done,
    name: DEAL_STATUS_LABELS[DealStatus.done],
    cards: []
  }
]
