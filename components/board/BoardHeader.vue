<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

import { DealStatus } from '@/types'

defineEmits<{
  openCreateDealWindow: [status: DealStatus]
}>()
</script>

<template>
  <div class="flex items-center gap-5">
    <h1 class="text-3xl font-bold">Deal Board</h1>
    <UiButton size="sm" class="gap-1" @click="$emit('openCreateDealWindow', DealStatus.todo)">
      <Plus class="h-4 w-4" />
      <span>Add Deal</span>
    </UiButton>
  </div>
</template>
