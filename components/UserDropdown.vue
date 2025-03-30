<script setup lang="ts">
import { ChevronUp, UserRound } from 'lucide-vue-next'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { SidebarMenuButton } from '@/components/ui/sidebar'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <SidebarMenuButton>
        <UserRound />
        <span>Username</span>
        <ChevronUp class="ml-auto" />
      </SidebarMenuButton>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="top" class="w-[--reka-popper-anchor-width]">
      <DropdownMenuItem>
        <span>Account</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
