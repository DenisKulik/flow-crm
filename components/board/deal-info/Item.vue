<script setup lang="ts">
const { labelText = '' } = defineProps<{ labelText: string }>()
</script>

<template>
  <div class="space-y-1">
    <label class="text-xs font-medium uppercase tracking-wider text-muted-foreground">{{ labelText }}</label>
    <div class="text-sm"><slot /></div>
  </div>
</template>
