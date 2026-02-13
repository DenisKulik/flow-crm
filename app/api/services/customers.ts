import type { Models } from 'appwrite'

import { DB, storage } from '@/api/appwrite'
import { COLLECTION_CUSTOMERS, DB_ID, STORAGE_ID } from '@/constants'
import type { CustomerDBType, CustomerListDBType, ICustomerForm } from '@/types'

interface ICustomersService {
  getCustomers: () => Promise<CustomerListDBType>
  getCustomerById: (id: string) => Promise<CustomerDBType>
  updateCustomer: (id: string, data: CustomerDBType) => Promise<CustomerDBType>
}

export class CustomersService implements ICustomersService {
  public getCustomers(): Promise<CustomerListDBType> {
    return DB.listRows({
      databaseId: DB_ID,
      tableId: COLLECTION_CUSTOMERS
    })
  }

  public getCustomerById(id: string): Promise<CustomerDBType> {
    return DB.getRow({
      databaseId: DB_ID,
      tableId: COLLECTION_CUSTOMERS,
      rowId: id
    })
  }

  public updateCustomer(id: string, data: ICustomerForm): Promise<CustomerDBType> {
    return DB.updateRow({
      databaseId: DB_ID,
      tableId: COLLECTION_CUSTOMERS,
      rowId: id,
      data
    })
  }

  public uploadImage(id: string, file: File): Promise<Models.File> {
    return storage.createFile({
      bucketId: STORAGE_ID,
      fileId: id,
      file
    })
  }

  public getFileDownload(storageId: string, fileId: string): string {
    return storage.getFileDownload({
      bucketId: storageId,
      fileId
    })
  }
}
