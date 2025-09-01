import { CustomersService } from '@/api'

const customersService = new CustomersService()

export const useCustomerQuery = (id: string) => {
  return useClientAsyncData(`customer-${id}`, async () => {
    const data = await customersService.getCustomerById(id)
    return data
  })
}
