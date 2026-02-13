<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

import { DEAL_STATUS_LABELS } from '@/constants'
import { DealStatus, type IDealForm } from '@/types'

const {
  isOpen,
  status,
  disabled = false
} = defineProps<{
  isOpen: boolean
  status?: DealStatus
  disabled?: boolean
}>()

const $emit = defineEmits<{
  close: []
  submit: [IDealForm]
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

const { handleSubmit, setFieldValue, isFieldDirty, resetForm } = useForm<IDealForm>({
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

const openHandler = (isOpen: boolean) => {
  if (!isOpen) {
    $emit('close')
  }
}

const close = () => {
  openHandler(false)
}

const onSubmit = handleSubmit((values) => {
  $emit('submit', values)
})

watch(
  () => status,
  (newStatus: DealStatus | undefined) => {
    if (newStatus) {
      setFieldValue('status', newStatus)
    }
  }
)

defineExpose({ resetForm })
</script>

<template>
  <UiDialog :open="isOpen" @update:open="openHandler">
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
                  <UiSelectItem
                    v-for="[dealStatus, statusName] in Object.entries(DEAL_STATUS_LABELS)"
                    :key="dealStatus"
                    :value="dealStatus"
                  >
                    {{ statusName }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>
          </UiFormItem>
        </UiFormField>
        <UiFormField
          v-slot="{ componentField }"
          :validate-on-blur="!isFieldDirty('customer.name')"
          name="customer.name"
        >
          <UiFormItem>
            <UiFormControl>
              <UiInput type="text" placeholder="Customer name" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <UiFormField
          v-slot="{ componentField }"
          :validate-on-blur="!isFieldDirty('customer.email')"
          name="customer.email"
        >
          <UiFormItem>
            <UiFormControl>
              <UiInput type="email" placeholder="Customer email" v-bind="componentField" />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </form>
      <UiDialogFooter class="sm:justify-start">
        <UiButton :disabled @click="onSubmit">
          <AppLoader v-if="disabled" :width="42" />
          <span v-else>Create</span>
        </UiButton>
        <UiButton :disabled variant="secondary" @click="close">Cancel</UiButton>
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>
