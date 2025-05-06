import { nanoid } from 'nanoid'

import { DB } from '@/api/appwrite'
import { COLLECTION_DEALS, DB_ID } from '@/constants'
import type { DealListDBType, IDealForm } from '@/types'

interface IDealsService {
  getDeals: () => Promise<DealListDBType>
}

export class DealsService implements IDealsService {
  public getDeals(): Promise<DealListDBType> {
    return DB.listDocuments(DB_ID, COLLECTION_DEALS)
  }

  public async createDeal(deal: IDealForm): Promise<void> {
    const dealId = nanoid()
    await DB.createDocument(DB_ID, COLLECTION_DEALS, dealId, deal)
  }

  public async updateDeal(id: string, deal: Partial<IDealForm>): Promise<void> {
    await DB.updateDocument(DB_ID, COLLECTION_DEALS, id, deal)
  }
}
