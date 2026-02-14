import type { Models } from 'appwrite'
import { nanoid } from 'nanoid'

import { CustomersService } from '@/api'
import { STORAGE_ID } from '@/constants'
import type { ICustomerForm } from '@/types'

const customersService = new CustomersService()

export const useCustomerActions = () => {
  const updateCustomer = async (id: string, data: ICustomerForm) => {
    await customersService.updateCustomer(id, data)
  }

  const uploadCustomerAvatar = async (file: File): Promise<Models.File> => {
    const fileId = nanoid()
    const data = await customersService.uploadImage(fileId, file)
    return data
  }

  const getCustomerAvatarUrl = (fileId: string) => {
    return customersService.getFileDownload(STORAGE_ID, fileId)
  }

  return {
    updateCustomer,
    uploadCustomerAvatar,
    getCustomerAvatarUrl
  }
}
