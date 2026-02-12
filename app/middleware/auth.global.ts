import { useAuthStore } from '~/stores/auth.store'

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
