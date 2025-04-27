<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

import type { DealStatus, IColumn } from '@/types'

const { column } = defineProps<{
  column: IColumn
}>()

const $emit = defineEmits<{
  (e: 'open-create-deal-window', status: DealStatus): void
}>()

const statusColorValue = getStatusColor(column.status)
const dealCount = computed(() => column.cards.length)

const openCreateDealWindow = () => {
  $emit('open-create-deal-window', column.status)
}
</script>

<template>
  <div class="select-none rounded-xl bg-secondary p-4 min-h-[500px] flex flex-col">
    <div class="flex items-center justify-between mb-3 border-b-2 pb-2" :style="{ borderColor: statusColorValue }">
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: statusColorValue }" />
        <h3 class="text-lg font-bold">{{ column.name }}</h3>
        <span v-if="dealCount" class="text-sm text-muted-foreground bg-background rounded-md px-2">
          {{ dealCount }}
        </span>
      </div>
    </div>
    <div class="space-y-3 flex-1">
      <slot name="cards" :cards="column.cards" />
      <div class="flex justify-center">
        <UiButton
          size="icon"
          variant="ghost"
          title="Add Deal"
          class="h-7 w-7 hover:opacity-80"
          @click="openCreateDealWindow"
        >
          <Plus class="h-4 w-4" />
        </UiButton>
      </div>
    </div>
  </div>
</template>
