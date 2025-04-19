<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

const emit = defineEmits(['submit'])

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50)
  })
)

const { isFieldDirty, handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: ''
  },
  validateOnMount: false
})

const onSubmit = handleSubmit((values) => emit('submit', values))

defineExpose({ resetForm })
</script>

<template>
  <form class="space-y-3">
    <UiFormField v-slot="{ componentField }" :validate-on-blur="!isFieldDirty('email')" name="email">
      <UiFormItem v-auto-animate>
        <UiFormControl>
          <UiInput type="email" placeholder="Email" v-bind="componentField" autocomplete="email" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <UiFormField v-slot="{ componentField }" :validate-on-blur="!isFieldDirty('password')" name="password">
      <UiFormItem v-auto-animate>
        <UiFormControl>
          <UiInput type="password" placeholder="Password" v-bind="componentField" autocomplete="current-password" />
        </UiFormControl>
        <UiFormMessage />
      </UiFormItem>
    </UiFormField>
    <div class="flex items-center justify-center gap-2">
      <UiButton type="button" @click="onSubmit">Login</UiButton>
    </div>
  </form>
</template>
