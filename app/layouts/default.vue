<script setup lang="ts">
import AppSidebar from '@/components/sidebar/index.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="w-full">
      <SidebarTrigger />
      <slot />
    </main>
  </SidebarProvider>
</template>
