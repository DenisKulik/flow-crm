<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

import { Button } from '~/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'

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
    <FormField v-slot="{ componentField }" :validate-on-blur="!isFieldDirty('email')" name="email">
      <FormItem v-auto-animate>
        <FormControl>
          <Input type="email" placeholder="Email" v-bind="componentField" autocomplete="email" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" :validate-on-blur="!isFieldDirty('password')" name="password">
      <FormItem v-auto-animate>
        <FormControl>
          <Input type="password" placeholder="Password" v-bind="componentField" autocomplete="current-password" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex items-center justify-center gap-2">
      <Button type="button" @click="onSubmit">Login</Button>
    </div>
  </form>
</template>
