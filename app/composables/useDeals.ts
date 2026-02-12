import { DealsService } from '@/api'
import type { IDealForm } from '@/types'

const dealsService = new DealsService()

export const useDeals = () => {
  const createDeal = async (data: IDealForm) => {
    await dealsService.createDeal(data)
  }

  const updateDeal = async (id: string, data: Partial<IDealForm>) => {
    await dealsService.updateDeal(id, data)
  }

  return {
    createDeal,
    updateDeal
  }
}
