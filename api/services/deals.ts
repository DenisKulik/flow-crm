import { DB } from '@/api/appwrite'
import { COLLECTION_DEALS, DB_ID } from '@/constants'
import type { DealListDBType } from '@/types'

interface IDealsService {
  getDeals: () => Promise<DealListDBType>
}

export class DealsService implements IDealsService {
  public getDeals(): Promise<DealListDBType> {
    return DB.listDocuments(DB_ID, COLLECTION_DEALS)
  }
}
