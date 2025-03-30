<script setup>
import Toaster from '@/components/ui/toast/Toaster.vue'

useHead({
  htmlAttrs: {
    class: 'dark'
  }
})
</script>

<template>
  <Toaster />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
