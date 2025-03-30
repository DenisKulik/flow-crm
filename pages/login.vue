<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast/use-toast'
import { vAutoAnimate } from '@formkit/auto-animate/vue'

useHead({
  title: 'Login | Flow CRM'
})

definePageMeta({
  layout: 'empty'
})

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    name: z.string().min(2).max(50),
    password: z.string().min(2).max(50)
  })
)

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    name: '',
    password: ''
  },
  validateOnMount: false
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h(
      'pre',
      { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' },
      h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))
    )
  })
})
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center">
    <div class="w-1/4 p-5 bg-sidebar rounded">
      <h1 class="mb-5 text-2xl font-bold text-center">Login</h1>

      <form class="space-y-3">
        <FormField :validate-on-blur="!isFieldDirty('email')" v-slot="{ componentField }" name="email">
          <FormItem v-auto-animate>
            <FormControl>
              <Input type="email" placeholder="Email" v-bind="componentField" autocomplete="email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField :validate-on-blur="!isFieldDirty('name')" v-slot="{ componentField }" name="name">
          <FormItem v-auto-animate>
            <FormControl>
              <Input type="text" placeholder="Name" v-bind="componentField" autocomplete="name" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField :validate-on-blur="!isFieldDirty('password')" v-slot="{ componentField }" name="password">
          <FormItem v-auto-animate>
            <FormControl>
              <Input type="password" placeholder="Password" v-bind="componentField" autocomplete="current-password" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex items-center justify-center gap-2">
          <Button type="button" @click="onSubmit">Login</Button>
          <Button type="button" @click="onSubmit">Register</Button>
        </div>
      </form>
    </div>
  </div>
</template>
