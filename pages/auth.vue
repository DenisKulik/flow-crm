<script setup lang="ts">
import { account } from '~/lib/appwrite'
import { useAppStore } from '~/store/app.store'
import { useAuthStore } from '~/store/auth.store'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/components/ui/toast/use-toast'
import { RegisterForm, LoginForm } from '@/components/auth'
import type { IUserForm } from '~/types'
import { nanoid } from 'nanoid'

useHead({
  title: 'Login | Flow CRM'
})

definePageMeta({
  layout: 'empty'
})

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
    const user = await account.get()
    return user
  } catch {
    return false
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

    if (user) {
      authStore.setUser({
        email: user.email,
        name: user.name,
        status: true
      })
      loginForm.value?.resetForm()
      await router.push('/')
    } else {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        variant: 'destructive'
      })
    }
  } catch (error: unknown) {
    toast({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Something went wrong, please try again.',
      variant: 'destructive'
    })
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
    toast({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Something went wrong, please try again.',
      variant: 'destructive'
    })
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
