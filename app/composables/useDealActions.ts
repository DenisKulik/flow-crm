import type { IDealForm } from '@/types'

export const useDealActions = () => {
  const createDeal = async (data: IDealForm) => {
    await $fetch('/api/deals', {
      method: 'POST',
      credentials: 'include',
      body: data
    })
  }

  const updateDeal = async (id: string, data: Partial<IDealForm>) => {
    await $fetch(`/api/deals/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: data
    })
  }

  return {
    createDeal,
    updateDeal
  }
}
