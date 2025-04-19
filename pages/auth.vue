<script setup lang="ts">
import { LoginForm, RegisterForm } from '@/components/auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAppStore } from '@/store/app.store'
import type { IUserForm } from '@/types'
import { showErrorToast } from '@/utils'

useHead({ title: 'Login | Flow CRM' })
definePageMeta({ layout: 'empty' })

interface IFormMethods {
  resetForm: () => void
}

const appStore = useAppStore()
const router = useRouter()

const { login, register } = useAuth()

const registerForm = useTemplateRef<IFormMethods>('registerForm')
const loginForm = useTemplateRef<IFormMethods>('loginForm')

const onLogin = async (values: IUserForm) => {
  try {
    appStore.startLoading('login')
    await login(values)
    loginForm.value?.resetForm()
    await router.push('/')
  } catch (error: unknown) {
    showErrorToast(error)
  } finally {
    appStore.stopLoading('login')
  }
}

const onRegister = async (values: IUserForm) => {
  try {
    appStore.startLoading('register')
    await register(values)
    registerForm.value?.resetForm()
    await onLogin(values)
  } catch (error: unknown) {
    showErrorToast(error)
  } finally {
    appStore.stopLoading('register')
  }
}
</script>

<template>
  <div class="min-h-screen w-full flex items-center justify-center">
    <div class="w-1/4 p-5 bg-sidebar rounded">
      <Tabs default-value="login" class="w-[400px]">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm ref="loginForm" @submit="onLogin" />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm ref="registerForm" @submit="onRegister" />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
