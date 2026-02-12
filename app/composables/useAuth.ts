import { AuthService } from '@/api'
import { useAuthStore } from '@/stores/auth.store'
import type { IUserForm, UserDBType } from '@/types'

const authService = new AuthService()

export const useAuth = () => {
  const authStore = useAuthStore()

  const getAuthUser = async (): Promise<UserDBType | null> => {
    try {
      return await authService.getAuthUser()
    } catch {
      return null
    }
  }

  const login = async (values: IUserForm): Promise<void> => {
    let user = await getAuthUser()

    if (!user) {
      await authService.login(values)
      user = await getAuthUser()
    }

    authStore.setUser({
      email: user!.email,
      name: user!.name,
      status: true
    })
  }

  const logout = async (): Promise<void> => {
    await authService.logout()
    authStore.$reset()
  }

  const register = async (values: IUserForm): Promise<void> => {
    await authService.register(values)
  }

  return {
    getAuthUser,
    login,
    logout,
    register
  }
}
