import { useAuthStore } from '@/stores/auth.store'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  const event = useRequestEvent()
  const user = event?.context?.user as { email: string; name: string } | undefined

  if (user?.email) {
    authStore.setUser({
      email: user.email,
      name: user.name,
      status: true
    })
  }
})
