import { DealsService } from '@/api'

const dealsService = new DealsService()

export const useDealQuery = (id: string) => {
  return useClientAsyncData(`deal-${id}`, async () => {
    const data = await dealsService.getDealById(id)
    return data
  })
}
