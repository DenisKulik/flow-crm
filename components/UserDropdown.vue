<script setup lang="ts">
import { UserRound, ChevronUp } from 'lucide-vue-next'
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
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
