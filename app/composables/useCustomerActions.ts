import type { Models } from 'node-appwrite'

import type { ICustomerForm } from '@/types'
import { STORAGE_ID } from '~~/server/constants'

export const useCustomerActions = () => {
  const updateCustomer = async (id: string, data: ICustomerForm) => {
    await $fetch(`/api/customers/${id}`, {
      method: 'PATCH',
      body: data
    })
  }

  const uploadCustomerAvatar = async (file: File): Promise<Models.File> => {
    const formData = new FormData()
    formData.append('file', file)

    return await $fetch<Models.File>('/api/storage/upload', {
      method: 'POST',
      body: formData
    })
  }

  const getCustomerAvatarUrl = (fileId: string) => {
    const origin = import.meta.client ? window.location.origin : ''
    return `${origin}/api/storage/${STORAGE_ID}/${fileId}/preview`
  }

  return {
    updateCustomer,
    uploadCustomerAvatar,
    getCustomerAvatarUrl
  }
}
