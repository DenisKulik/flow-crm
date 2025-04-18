<script setup lang="ts">
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
      <UiTabs default-value="login" class="w-[400px]">
        <UiTabsList class="grid w-full grid-cols-2">
          <UiTabsTrigger value="login">Login</UiTabsTrigger>
          <UiTabsTrigger value="register">Register</UiTabsTrigger>
        </UiTabsList>
        <UiTabsContent value="login">
          <AuthLoginForm ref="loginForm" @submit="onLogin" />
        </UiTabsContent>
        <UiTabsContent value="register">
          <AuthRegisterForm ref="registerForm" @submit="onRegister" />
        </UiTabsContent>
      </UiTabs>
    </div>
  </div>
</template>
