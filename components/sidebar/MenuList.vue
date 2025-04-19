<script setup lang="ts">
import type { IMenuItem } from '@/constants'

defineProps<{
  items: IMenuItem[]
}>()
</script>

<template>
  <UiSidebarMenu>
    <UiSidebarMenuItem v-for="item in items" :key="item.id">
      <UiSidebarMenuButton as-child>
        <NuxtLink :to="item.url">
          <component :is="item.icon" />
          <span>{{ item.title }}</span>
        </NuxtLink>
      </UiSidebarMenuButton>
    </UiSidebarMenuItem>
  </UiSidebarMenu>
</template>
