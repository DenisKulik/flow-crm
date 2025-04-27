import { useQuery } from '@tanstack/vue-query'

import { DealsService } from '@/api'
import { dealColumns } from '@/data'
import type { IDeal } from '@/types'
import { formatDate, formatPrice } from '@/utils'

const dealsService = new DealsService()

export const useDealsQuery = () => {
  return useQuery({
    queryKey: ['deals'],
    queryFn: () => dealsService.getDeals(),
    select(data) {
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
  })
}
