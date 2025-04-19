<script setup>
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useAppStore } from '~/stores/app.store.js'

useHead({
  htmlAttrs: {
    class: 'dark'
  }
})

if (import.meta.client) {
  useAppInit()
}

const appStore = useAppStore()
const { isInitialized, isLoading } = storeToRefs(appStore)
</script>

<template>
  <Toaster />
  <AppLoader
    v-show="!isInitialized || isLoading"
    class="fixed inset-0 z-50 flex items-center justify-center bg-background"
  />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
