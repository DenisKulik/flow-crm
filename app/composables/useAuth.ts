import { useAuthStore } from '@/stores/auth.store'
import type { IUserForm, UserDBType } from '@/types'

export const useAuth = () => {
  const authStore = useAuthStore()

  const getAuthUser = async (): Promise<UserDBType | null> => {
    try {
      return await useFetch('api/auth/user')
    } catch {
      return null
    }
  }

  const login = async (values: IUserForm): Promise<void> => {
    let user = await getAuthUser()

    if (!user) {
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: values
      })
      user = await getAuthUser()
    }

    authStore.setUser({
      email: user!.email,
      name: user!.name,
      status: true
    })
  }

  const logout = async (): Promise<void> => {
    await $fetch('api/auth/logout', {
      method: 'DELETE'
    })
    authStore.$reset()
  }

  const register = async (values: IUserForm): Promise<void> => {
    await $fetch('/api/auth/register', {
      method: 'POST',
      body: values
    })
  }

  return {
    getAuthUser,
    login,
    logout,
    register
  }
}
