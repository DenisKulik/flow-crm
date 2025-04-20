import { useQuery } from '@tanstack/vue-query'

import { DB } from '@/api/appwrite'
import { COLLECTION_DEALS, DB_ID } from '@/constants'
import { dealColumns } from '@/data'
import type { IDeal } from '@/types'
import { formatDate, formatPrice } from '@/utils'

export const useDealsQuery = () => {
  return useQuery({
    queryKey: ['deals'],
    queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
    select(data) {
      const board = structuredClone(dealColumns)
      const deals = data.documents as unknown as IDeal[]

      deals.forEach((deal) => {
        const columnIdx = board.findIndex((column) => column.id === deal.status)
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
  })
}
