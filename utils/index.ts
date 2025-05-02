import { Temporal } from '@js-temporal/polyfill'

import { toast } from '@/components/ui/toast'
import { STATUS_COLORS } from '@/constants'
import { dealColumns } from '@/data'
import type { DealListDBType, DealStatus, IColumn, IDeal } from '@/types'

export const showErrorToast = (error: unknown, fallback = 'Something went wrong, please try again.') => {
  toast({
    title: 'Error',
    description: error instanceof Error ? error.message : fallback,
    variant: 'destructive'
  })
}

export const formatDate = (date: string) => {
  return Temporal.Instant.from(date)
    .toZonedDateTimeISO('UTC')
    .toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

export const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export const getStatusColor = (status: DealStatus) => {
  return STATUS_COLORS[status] || '#6b7280'
}

export const transformToBoard = (data: DealListDBType): IColumn[] => {
  const board = structuredClone(dealColumns)
  const deals = data.documents as unknown as IDeal[]

  deals.forEach((deal) => {
    const columnIdx = board.findIndex((column) => column.status === deal.status)
    board[columnIdx].cards.push({
      id: deal.$id,
      name: deal.name,
      price: formatPrice(deal.price),
      companyName: deal.customer.name,
      createdAt: formatDate(deal.$createdAt),
      status: deal.status
    })
  })

  return board
}
