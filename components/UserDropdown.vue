<script setup lang="ts">
import { ChevronUp, UserRound } from 'lucide-vue-next'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { toast } from '~/components/ui/toast'
import { account } from '~/lib/appwrite'
import { useAppStore } from '~/store/app.store'
import { useAuthStore } from '~/store/auth.store'

const router = useRouter()

const authStore = useAuthStore()
const { state } = storeToRefs(authStore)
const appStore = useAppStore()

const logout = async () => {
  try {
    appStore.startLoading('logout')
    await account.deleteSession('current')
    authStore.$reset()
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
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <SidebarMenuButton>
        <UserRound />
        <span>{{ state.user.name }}</span>
        <ChevronUp class="ml-auto" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="top" class="w-[--reka-popper-anchor-width]">
      <DropdownMenuItem>
        <span>Account</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="logout">
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
