import { useAuthStore } from '~/store/auth.store'
import { useAppStore } from '~/store/app.store'
import { account } from '~/lib/appwrite'

export const useAppInit = async () => {
  const authStore = useAuthStore()
  const appStore = useAppStore()

  try {
    const user = await account.get()
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
