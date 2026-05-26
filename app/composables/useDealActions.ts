import type { IDealForm } from '@/types'

export const useDealActions = () => {
  const createDeal = async (data: IDealForm) => {
    await $fetch('/api/deals', {
      method: 'POST',
      body: data
    })
  }

  const updateDeal = async (id: string, data: Partial<IDealForm>) => {
    await $fetch(`/api/deals/${id}`, {
      method: 'PATCH',
      body: data
    })
  }

  return {
    createDeal,
    updateDeal
  }
}
