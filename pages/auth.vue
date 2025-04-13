<script setup lang="ts">
import { account } from '~/lib/appwrite'
import { useAppStore } from '~/store/app.store'
import { useAuthStore } from '~/store/auth.store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoginForm, RegisterForm } from '@/components/auth'
import type { IUserForm } from '~/types'
import { nanoid } from 'nanoid'
import { showErrorToast } from '~/utils'

useHead({ title: 'Login | Flow CRM' })
definePageMeta({ layout: 'empty' })

interface IFormMethods {
  resetForm: () => void
}

const appStore = useAppStore()
const authStore = useAuthStore()
const router = useRouter()

const registerForm = useTemplateRef<IFormMethods>('registerForm')
const loginForm = useTemplateRef<IFormMethods>('loginForm')

const getAuthUser = async () => {
  try {
    return await account.get()
  } catch {
    return null
  }
}

const login = async (values: IUserForm) => {
  try {
    appStore.startLoading('login')
    const { email, password } = values
    let user = await getAuthUser()

    if (!user) {
      await account.createEmailPasswordSession(email, password)
      user = await account.get()
    }
    authStore.setUser({
      email: user.email,
      name: user.name,
      status: true
    })
    loginForm.value?.resetForm()
    await router.push('/')
  } catch (error: unknown) {
    showErrorToast(error)
  } finally {
    appStore.stopLoading('login')
  }
}

const register = async (values: IUserForm) => {
  try {
    appStore.startLoading('register')
    const { email, name, password } = values
    const userId = nanoid()
    await account.create(userId, email, password, name)
    registerForm.value?.resetForm()
    await login(values)
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
          <LoginForm ref="loginForm" @submit="login" />
        </TabsContent>
        <TabsContent value="register">
          <RegisterForm ref="registerForm" @submit="register" />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
