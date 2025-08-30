import { DB } from '@/api/appwrite'
import { COLLECTION_CUSTOMERS, DB_ID } from '@/constants'
import type { CustomerListDBType } from '~/types'

interface ICustomersService {
  getCustomers: () => Promise<CustomerListDBType>
}

export class CustomersService implements ICustomersService {
  public getCustomers(): Promise<CustomerListDBType> {
    return DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS)
  }
}
