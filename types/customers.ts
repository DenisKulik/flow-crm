import type { Models } from 'appwrite'

import type { IBaseEntity } from '.'

export interface ICustomer extends IBaseEntity {
  name: string
  email: string
  avatar_url: string
  from_source?: string
}

export type CustomerDBType = Models.Document & ICustomer

export type CustomerListDBType = {
  total: number
  documents: CustomerDBType[]
}

export type ICustomerForm = Pick<ICustomer, 'name' | 'email' | 'from_source'> & {
  avatar_url?: string
}
