import { CustomersService } from '@/api'

const customersService = new CustomersService()

// TODO: рефакторинг transform
export const useCustomersQuery = () => {
  return useClientAsyncData('customers', async () => {
    const data = await customersService.getCustomers()
    return transformToCustomersTable(data)
  })
}
