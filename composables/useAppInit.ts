import { useAppStore } from '@/stores/app.store'
import { useAuthStore } from '@/stores/auth.store'

export const useAppInit = async () => {
  const authStore = useAuthStore()
  const appStore = useAppStore()

  try {
    const user = await useAuth().getAuthUser()
    if (user) {
      authStore.setUser({
        email: user.email,
        name: user.name,
        status: true
      })
    }
  } catch {
    console.warn('User is not logged in')
  } finally {
    appStore.setInitialized()
  }
}
