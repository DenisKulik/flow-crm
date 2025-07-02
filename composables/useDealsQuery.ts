import { DealsService } from '@/api'
import { dealColumns } from '@/data'

const dealsService = new DealsService()

export const useDealsQuery = () =>
  useClientAsyncData(
    'deals',
    async () => {
      const data = await dealsService.getDeals()
      return transformToBoard(data)
    },
    {
      default: () => dealColumns
    }
  )
