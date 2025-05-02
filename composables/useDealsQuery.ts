import { DealsService } from '@/api'

const dealsService = new DealsService()

export const useDealsQuery = () =>
  useClientAsyncData('deals', async () => {
    const data = await dealsService.getDeals()
    return transformToBoard(data)
  })
