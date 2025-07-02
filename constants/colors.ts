import { DealStatus } from '@/types'

export const STATUS_COLORS = {
  [DealStatus.todo]: '#3b82f6', // blue-500
  [DealStatus.toBeAgreed]: '#67e8f9', // cyan-300
  [DealStatus.inProgress]: '#f59e0b', // amber-500
  [DealStatus.produced]: '#6ee7b7', // emerald-300
  [DealStatus.done]: '#22c55e' // green-500
}
