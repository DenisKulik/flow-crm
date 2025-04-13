import { useAuthStore } from '~/store/auth.store'
import { account } from '~/lib/appwrite'

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  const { isAuth } = storeToRefs(authStore)

  if (to.path === '/auth' && isAuth.value) {
    return navigateTo('/')
  }

  if (to.path !== '/auth' && !isAuth.value) {
    return navigateTo('/auth')
  }
})
