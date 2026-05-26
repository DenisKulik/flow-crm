import type { DealDBType } from '@/types'

export const useDealQuery = (id: string) => {
  return useLazyAsyncData(`deal-${id}`, () => $fetch<DealDBType>(`/api/deals/${id}`))
}
