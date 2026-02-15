import { CustomersService } from '@/api'

const customersService = new CustomersService()

// TODO: рефакторинг transform
export const useCustomersQuery = () => {
  return useLazyAsyncData('customers', async () => customersService.getCustomers(), {
    server: false,
    transform: transformToCustomersTable
  })
}
