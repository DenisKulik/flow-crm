<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

import type { ICustomerForm } from '@/types'

interface Props {
  data: ICustomerForm
  status: string
  isAvatarUploading: boolean
}

const $emit = defineEmits<{
  submit: [ICustomerForm]
  uploadFile: [File]
}>()

const { data } = defineProps<Props>()

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1).max(50),
    email: z.string().email().max(50),
    avatar_url: z.string().url().optional(),
    from_source: z.string().optional()
  })
)

const { handleSubmit, isFieldDirty, setValues, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    email: '',
    avatar_url: '',
    from_source: ''
  }
})

const uploadFile = async (file: File) => {
  $emit('uploadFile', file)
}

const onSubmit = handleSubmit((values) => {
  $emit('submit', values)
})

watch(
  () => data,
  (newData) => {
    if (newData) {
      setValues({
        ...newData,
        from_source: newData.from_source ?? ''
      })
    }
  },
  { immediate: true }
)

defineExpose({ setFieldValue })
</script>

<template>
  <form id="customerForm" class="max-w-lg space-y-3">
    <UiFormField v-slot="{ componentField }" :validate-on-blur="!isFieldDirty('name')" name="name">
      <UiFormItem>
        <UiFormControl>
          <UiFormLabel>Name</UiFormLabel>
          <UiInput type="text" placeholder="Name" v-bind="componentField" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiFormField v-slot="{ componentField }" :validate-on-blur="!isFieldDirty('email')" name="email">
      <UiFormItem>
        <UiFormControl>
          <UiFormLabel>Email</UiFormLabel>
          <UiInput type="email" placeholder="Email" v-bind="componentField" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiFormField v-slot="{ componentField }" :validate-on-blur="!isFieldDirty('from_source')" name="from_source">
      <UiFormItem>
        <UiFormControl>
          <UiFormLabel>Source</UiFormLabel>
          <UiInput type="text" placeholder="Source" v-bind="componentField" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiFormField :validate-on-blur="!isFieldDirty('avatar_url')" name="avatar_url">
      <UiFormItem>
        <UiFormControl>
          <UiFormLabel>Avatar</UiFormLabel>
          <CustomersAvatarUploader :src="values.avatar_url ?? ''" :loading="isAvatarUploading" @change="uploadFile" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiButton :disabled="status === 'pending'" type="button" @click="onSubmit">Update</UiButton>
  </form>
</template>
