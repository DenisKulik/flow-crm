<script setup lang="ts">
import AppSidebar from '@/components/sidebar/index.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="flex w-full flex-col">
      <SidebarTrigger />
      <slot />
    </main>
  </SidebarProvider>
</template>
