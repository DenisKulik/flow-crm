import { CustomersService } from '@/api'
import type { ICustomerForm } from '@/types'

const customersService = new CustomersService()

export const useCustomers = () => {
  const updateCustomer = async (id: string, data: ICustomerForm) => {
    await customersService.updateCustomer(id, data)
  }

  return {
    updateCustomer
  }
}
