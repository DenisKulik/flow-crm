<script setup lang="ts">
const { width = 100 } = defineProps<{
  width?: number
}>()
</script>

<template>
  <div class="app-loader">
    <img src="/loader.svg" alt="loader" :width />
  </div>
</template>
