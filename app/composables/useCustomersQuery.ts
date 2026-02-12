import { CustomersService } from '@/api'

const customersService = new CustomersService()

export const useCustomersQuery = () =>
  useClientAsyncData('customers', async () => {
    const data = await customersService.getCustomers()
    return transformToCustomersTable(data)
  })
