import { useAuthStore } from '~/store/auth.store'
import { account } from '~/lib/appwrite'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore()
  const { state } = storeToRefs(authStore)
  let isLoginState = state.value.user?.status

  if (!isLoginState) {
    const user = await account.get()
    if (user) {
      authStore.setUser({
        email: user.email,
        name: user.name,
        status: true
      })
      isLoginState = true
    }
  }

  if (to.path !== '/auth' && !isLoginState) {
    return navigateTo('/auth')
  }
})
