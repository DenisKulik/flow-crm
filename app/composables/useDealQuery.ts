import { DealsService } from '@/api'

const dealsService = new DealsService()

export const useDealQuery = (id: string) => {
  return useLazyAsyncData(`deal-${id}`, async () => dealsService.getDealById(id), {
    server: false
  })
}
