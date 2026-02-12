import type { Models } from 'appwrite'

import { DB, storage } from '@/api/appwrite'
import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '@/constants'
import type { CustomerDBType, CustomerListDBType, ICustomerForm } from '~/types'

interface ICustomersService {
  getCustomers: () => Promise<CustomerListDBType>
  getCustomerById: (id: string) => Promise<CustomerDBType>
  updateCustomer: (id: string, data: CustomerDBType) => Promise<CustomerDBType>
}

export class CustomersService implements ICustomersService {
  public getCustomers(): Promise<CustomerListDBType> {
    return DB.listDocuments(DB_ID, COLLECTION_CUSTOMERS)
  }

  public getCustomerById(id: string): Promise<CustomerDBType> {
    return DB.getDocument(DB_ID, COLLECTION_CUSTOMERS, id)
  }

  public updateCustomer(id: string, data: ICustomerForm): Promise<CustomerDBType> {
    return DB.updateDocument(DB_ID, COLLECTION_CUSTOMERS, id, data)
  }

  public uploadImage(id: string, file: File): Promise<Models.File> {
    return storage.createFile(STORAGE_ID, id, file)
  }

  public getFileDownload(storageId: string, fileId: string): string {
    return storage.getFileDownload(storageId, fileId)
  }
}
