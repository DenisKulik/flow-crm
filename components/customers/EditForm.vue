<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

import type { ICustomerForm } from '~/types'

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

const dragOver = ref(false)
const fileInput = ref<HTMLInputElement>()

const handleAvatarChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    await uploadFile(file)
  }
}

const uploadFile = async (file: File) => {
  $emit('uploadFile', file)
}

const handleDrop = async (event: DragEvent) => {
  event.preventDefault()
  dragOver.value = false

  const file = event.dataTransfer?.files?.[0]
  if (file) {
    await uploadFile(file)
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  dragOver.value = true
}

const handleDragLeave = () => {
  dragOver.value = false
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
          <div
            class="relative w-32 h-32 mx-auto"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @dragleave="handleDragLeave"
          >
            <!-- Drag & Drop Area -->
            <div
              :class="[
                'absolute inset-0 border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer',
                dragOver
                  ? 'border-primary bg-primary/5'
                  : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50',
                isAvatarUploading && 'pointer-events-none'
              ]"
              @click="fileInput?.click()"
            >
              <div class="absolute inset-2 rounded-md overflow-hidden">
                <UiAvatar size="lg" shape="square" class="w-full h-full">
                  <UiAvatarImage :src="values.avatar_url ?? ''" />
                  <UiAvatarFallback class="text-muted-foreground">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </UiAvatarFallback>
                </UiAvatar>
              </div>
              <div
                v-if="!values.avatar_url"
                class="absolute inset-0 flex flex-col items-center justify-center text-center p-2"
              >
                <svg class="w-6 h-6 text-muted-foreground mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span class="text-xs text-muted-foreground">Click or drag to upload</span>
              </div>
              <div
                v-if="isAvatarUploading"
                class="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg"
              >
                <div class="flex flex-col items-center">
                  <div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2" />
                  <span class="text-xs text-muted-foreground">Uploading...</span>
                </div>
              </div>
              <div
                v-if="values.avatar_url && !isAvatarUploading"
                class="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center rounded-lg"
              >
                <div class="text-center text-white">
                  <svg class="w-5 h-5 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span class="text-xs">Change photo</span>
                </div>
              </div>
            </div>
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleAvatarChange" />
          </div>
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiButton :disabled="status === 'pending'" type="button" @click="onSubmit">Update</UiButton>
  </form>
</template>
