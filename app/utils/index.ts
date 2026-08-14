import { Temporal } from '@js-temporal/polyfill'

import { toast } from '@/components/ui/toast'
import { STATUS_COLORS } from '@/constants'
import { dealColumns } from '@/data'
import type {
  CommentListDBType,
  CustomerListDBType,
  DealListDBType,
  DealStatus,
  IColumn,
  IComment,
  ICustomer,
  IDeal
} from '@/types'

export const showErrorToast = (error: unknown, fallback = 'Something went wrong, please try again.') => {
  toast({
    title: 'Error',
    description: error instanceof Error ? error.message : fallback,
    variant: 'destructive',
    duration: 3000
  })
}

export const showSuccessToast = (message: string) => {
  toast({
    title: 'Success',
    description: message,
    variant: 'success',
    duration: 3000
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

export const moveCardInBoard = (board: IColumn[], cardId: string, newStatus: DealStatus): IColumn[] => {
  const sourceColumn = board.find((column) => column.cards.some((card) => card.id === cardId))

  if (!sourceColumn || sourceColumn.status === newStatus) {
    return board
  }

  const card = sourceColumn.cards.find((item) => item.id === cardId)
  if (!card) {
    return board
  }

  const updatedCard = { ...card, status: newStatus }

  return board.map((column) => {
    if (column.status === sourceColumn.status) {
      return { ...column, cards: column.cards.filter((item) => item.id !== cardId) }
    }

    if (column.status === newStatus) {
      return { ...column, cards: [...column.cards, updatedCard] }
    }

    return column
  })
}

export const transformToBoard = (data: DealListDBType): IColumn[] => {
  const board = structuredClone(dealColumns)
  const deals = data.rows as unknown as IDeal[]

  deals.forEach((deal) => {
    const columnIdx = board.findIndex((column) => column.status === deal.status)
    if (columnIdx !== -1 && board[columnIdx]) {
      board[columnIdx].cards.push({
        id: deal.$id,
        name: deal.name,
        price: formatPrice(deal.price),
        companyName: deal.customer.name,
        createdAt: formatDate(deal.$createdAt),
        status: deal.status
      })
    }
  })

  return board
}

export const transformToCustomersTable = (data: CustomerListDBType): ICustomer[] => {
  const customers = data.rows as unknown as ICustomer[]
  return customers.map((customer) => ({
    ...customer
  }))
}

export const transformComments = (data: CommentListDBType): IComment[] => {
  const comments = data.rows as unknown as IComment[]
  return comments.map((comment) => ({
    ...comment,
    $createdAt: formatDate(comment.$createdAt)
  }))
}
