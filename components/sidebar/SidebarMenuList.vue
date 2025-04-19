<script setup lang="ts">
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import type { IMenuItem } from '~/constants'

defineProps<{
  items: IMenuItem[]
}>()
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem v-for="item in items" :key="item.id">
      <SidebarMenuButton as-child>
        <NuxtLink :to="item.url">
          <component :is="item.icon" />
          <span>{{ item.title }}</span>
        </NuxtLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
