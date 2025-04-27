<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

import { DealStatus, type IDealForm } from '@/types'

const { isOpen, status } = defineProps<{
  isOpen: boolean
  status: DealStatus
}>()

const $emit = defineEmits<{
  (e: 'close'): void
}>()

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1).max(50),
    price: z.number().min(0),
    status: z.nativeEnum(DealStatus),
    customer: z.object({
      name: z.string().min(1).max(50),
      email: z.string().email()
    })
  })
)

// TODO: status is not changing when status is changed
const { handleSubmit, isFieldDirty, resetForm } = useForm<IDealForm>({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    price: 0,
    status,
    customer: {
      name: '',
      email: ''
    }
  },
  validateOnMount: false
})

const close = () => {
  $emit('close')
}

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

watch(
  () => status,
  (newStatus) => {
    resetForm({
      values: {
        status: newStatus
      }
    })
  }
)
</script>

<template>
  <UiDialog :open="isOpen" @update:open="close">
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Create Deal</UiDialogTitle>
        <UiDialogDescription>Fill in the details to create a new deal</UiDialogDescription>
      </UiDialogHeader>

      <form id="dialogForm" class="space-y-3">
        <UiFormField v-slot="{ componentField }" :validate-on-blur="!isFieldDirty('name')" name="name">
          <UiFormItem>
            <UiFormControl>
              <UiInput type="text" placeholder="Deal name" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" :validate-on-blur="!isFieldDirty('price')" name="price">
          <UiFormItem>
            <UiFormControl>
              <UiInput type="number" placeholder="Price" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField v-slot="{ componentField }" :validate-on-blur="!isFieldDirty('status')" name="status">
          <UiFormItem>
            <UiSelect v-bind="componentField">
              <UiFormControl>
                <UiSelectTrigger>
                  <UiSelectValue placeholder="Select a deal status" />
                </UiSelectTrigger>
              </UiFormControl>
              <UiSelectContent>
                <UiSelectGroup>
                  <!-- TODO: add status names-->
                  <UiSelectItem v-for="dealStatus in DealStatus" :key="dealStatus" :value="dealStatus">
                    {{ dealStatus }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </UiFormItem>
        </UiFormField>
      </form>
      <UiDialogFooter class="sm:justify-start">
        <UiButton type="button" form="dialogForm" @click="onSubmit">Create</UiButton>
        <UiButton type="button" variant="secondary" @click="close">Cancel</UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
