import { nanoid } from 'nanoid'

import { DB } from '@/api/appwrite'
import { COLLECTION_DEALS, DB_ID } from '@/constants'
import type { DealDBType, DealListDBType, IDealForm } from '@/types'

interface IDealsService {
  getDeals: () => Promise<DealListDBType>
  getDealById: (id: string) => Promise<DealDBType>
  createDeal: (deal: IDealForm) => Promise<void>
  updateDeal: (id: string, deal: Partial<IDealForm>) => Promise<void>
}

export class DealsService implements IDealsService {
  public getDeals(): Promise<DealListDBType> {
    return DB.listRows({
      databaseId: DB_ID,
      tableId: COLLECTION_DEALS
    })
  }

  public getDealById(id: string): Promise<DealDBType> {
    return DB.getRow({
      databaseId: DB_ID,
      tableId: COLLECTION_DEALS,
      rowId: id
    })
  }

  public async createDeal(deal: IDealForm): Promise<void> {
    const dealId = nanoid()
    await DB.createRow({
      databaseId: DB_ID,
      tableId: COLLECTION_DEALS,
      rowId: dealId,
      data: deal
    })
  }

  public async updateDeal(id: string, deal: Partial<IDealForm>): Promise<void> {
    await DB.updateRow({
      databaseId: DB_ID,
      tableId: COLLECTION_DEALS,
      rowId: id,
      data: deal
    })
  }
}
