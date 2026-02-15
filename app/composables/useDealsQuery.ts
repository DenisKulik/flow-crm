import { DealsService } from '@/api'
import { dealColumns } from '@/data'

const dealsService = new DealsService()

export const useDealsQuery = () => {
  return useLazyAsyncData('deals', async () => await dealsService.getDeals(), {
    server: false,
    default: () => dealColumns,
    transform: transformToBoard
  })
}
