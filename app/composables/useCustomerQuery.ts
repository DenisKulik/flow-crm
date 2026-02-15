import { CustomersService } from '@/api'

const customersService = new CustomersService()

export const useCustomerQuery = (id: string) => {
  return useLazyAsyncData(`customer-${id}`, async () => customersService.getCustomerById(id), {
    server: false
  })
}
