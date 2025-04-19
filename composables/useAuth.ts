import { AuthService } from '@/api'
import { useAuthStore } from '@/store/auth.store'
import type { IUserForm } from '@/types'

const authService = new AuthService()

export const useAuth = () => {
  const authStore = useAuthStore()

  const login = async (values: IUserForm): Promise<void> => {
    let user = await authService.getAuthUser()

    if (!user) {
      await authService.login(values)
      user = await authService.getAuthUser()
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
    login,
    logout,
    register
  }
}
