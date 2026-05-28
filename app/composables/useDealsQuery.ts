import { dealColumns } from '@/data'
import type { DealListDBType } from '@/types'

export const useDealsQuery = () => {
  return useLazyAsyncData(
    'deals',
    () =>
      $fetch<DealListDBType>('/api/deals', {
        credentials: 'include'
      }),
    {
      default: () => dealColumns,
      transform: transformToBoard
    }
  )
}
