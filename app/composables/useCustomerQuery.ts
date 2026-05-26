import type { CustomerDBType } from '@/types'

export const useCustomerQuery = (id: string) => {
  return useLazyAsyncData(`customer-${id}`, () => $fetch<CustomerDBType>(`/api/customers/${id}`))
}
