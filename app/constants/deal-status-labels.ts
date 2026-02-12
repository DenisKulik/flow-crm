import { DealStatus } from '@/types'

export const DEAL_STATUS_LABELS: Record<DealStatus, string> = {
  [DealStatus.todo]: 'Incoming',
  [DealStatus.toBeAgreed]: 'Agreement',
  [DealStatus.inProgress]: 'In production',
  [DealStatus.produced]: 'Produced',
  [DealStatus.done]: 'For shipment'
}
