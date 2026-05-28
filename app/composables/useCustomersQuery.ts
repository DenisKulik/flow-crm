import type { CustomerListDBType } from '@/types'

export const useCustomersQuery = () => {
  return useLazyAsyncData(
    'customers',
    () =>
      $fetch<CustomerListDBType>('/api/customers', {
        credentials: 'include'
      }),
    {
      transform: transformToCustomersTable
    }
  )
}
