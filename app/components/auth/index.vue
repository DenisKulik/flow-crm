<script setup lang="ts">
import { Github } from 'lucide-vue-next'

import { useAppStore } from '@/stores/app.store'
import type { IFormMethods, IUserForm } from '@/types'
import { showErrorToast } from '@/utils'

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
  <div class="w-1/4 p-5 bg-sidebar rounded">
    <UiTabs default-value="login" class="w-full">
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
    <UiSeparator class="my-3" />
    <UiButton as-child variant="outline" class="w-full">
      <a href="/api/auth/oauth/github">
        <Github class="h-4 w-4" />
        Login with GitHub
      </a>
    </UiButton>
  </div>
</template>
