<script setup lang="ts">
import { ChevronUp, UserRound } from 'lucide-vue-next'

import { toast } from '@/components/ui/toast'
import { useAppStore } from '@/stores/app.store'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()

const { logout } = useAuth()
const authStore = useAuthStore()
const { state } = storeToRefs(authStore)
const appStore = useAppStore()

const onLogout = async () => {
  try {
    appStore.startLoading('logout')
    await logout()
    await router.push('/auth')
  } catch (error: unknown) {
    toast({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Something went wrong, please try again.',
      variant: 'destructive'
    })
  } finally {
    appStore.stopLoading('logout')
  }
}
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiSidebarMenuButton>
        <UserRound />
        <span>{{ state.user.name }}</span>
        <ChevronUp class="ml-auto" />
      </UiSidebarMenuButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent side="top" class="w-[--reka-popper-anchor-width]">
      <UiDropdownMenuItem>
        <span>Account</span>
      </UiDropdownMenuItem>
      <UiDropdownMenuItem @click="onLogout">
        <span>Log out</span>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
