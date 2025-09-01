<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

useSeoMeta({ title: 'Edit customer | Flow CRM' })

const route = useRoute()
const { id: customerId } = route.params

const { data, status, error } = useCustomerQuery(customerId as string)
const { updateCustomer } = useCustomers()

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1).max(50),
    email: z.string().email().max(50),
    avatar_url: z.string().url().optional(),
    from_source: z.string().optional()
  })
)

const { handleSubmit, isFieldDirty, setValues } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    email: '',
    avatar_url: '',
    from_source: ''
  }
})

const onSubmit = handleSubmit(async (values) => {
  await updateCustomer(customerId as string, values)
})

watch(
  data,
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
watch(error, (newError) => {
  if (newError) {
    showErrorToast(newError)
  }
})
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-2">Edit {{ data?.name }} customer</h1>
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
      <UiButton :disabled="status === 'pending'" type="button" @click="onSubmit">Update</UiButton>
    </form>
  </div>
</template>
