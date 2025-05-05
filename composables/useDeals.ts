import { DealsService } from '@/api'
import type { IDealForm } from '@/types'

const dealsService = new DealsService()

export const useDeals = () => {
  const createDeal = async (data: IDealForm) => {
    await dealsService.createDeal(data)
  }

  return {
    createDeal
  }
}
