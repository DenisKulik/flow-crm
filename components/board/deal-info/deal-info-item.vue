<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  labelText: string
  labelIcon: Component
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2 text-sm text-muted-foreground">
      <component :is="labelIcon" class="h-4 w-4" />
      <span>{{ labelText }}</span>
    </div>
    <slot />
  </div>
</template>
