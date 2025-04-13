<script setup>
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useAppStore } from '~/store/app.store.js'

useHead({
  htmlAttrs: {
    class: 'dark'
  }
})

const appStore = useAppStore()
const { isLoading } = storeToRefs(appStore)
</script>

<template>
  <Toaster />
  <AppLoader v-show="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-background" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
