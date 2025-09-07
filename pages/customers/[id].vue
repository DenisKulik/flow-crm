<script setup lang="ts">
import type { ICustomerForm } from '~/types'

useSeoMeta({ title: 'Edit customer | Flow CRM' })

const route = useRoute()
const { id: customerId } = route.params

const { data, status, error } = useCustomerQuery(customerId as string)
const { updateCustomer, uploadCustomerAvatar, getCustomerAvatarUrl } = useCustomers()

const isAvatarUploading = ref(false)
const formRef = useTemplateRef<HTMLFormElement>('formRef')

const uploadFile = async (file: File) => {
  if (!file.type.startsWith('image/')) {
    showErrorToast('Please select an image file')
    return
  }

  isAvatarUploading.value = true
  try {
    const data = await uploadCustomerAvatar(file)
    const avatarUrl = getCustomerAvatarUrl(data.$id)
    formRef.value?.setFieldValue('avatar_url', avatarUrl)
    showSuccessToast('Avatar uploaded successfully')
  } catch (error) {
    showErrorToast(error)
  } finally {
    isAvatarUploading.value = false
  }
}

const onSubmit = async (data: ICustomerForm) => {
  try {
    await updateCustomer(customerId as string, data)
    showSuccessToast('Customer updated successfully')
  } catch (error: unknown) {
    showErrorToast(error)
  }
}

watch(error, (newError) => {
  if (newError) {
    showErrorToast(newError)
  }
})
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-2">Edit {{ data?.name }} customer</h1>
    <CustomersEditForm ref="formRef" :data :status :is-avatar-uploading @submit="onSubmit" @upload-file="uploadFile" />
  </div>
</template>
