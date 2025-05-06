<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

import { useDragAndDrop } from '@/composables/useDragAndDrop'
import type { DealStatus, ICard, IColumn } from '@/types'

const { column } = defineProps<{
  column: IColumn
}>()

const $emit = defineEmits<{
  (e: 'open-create-deal-window', status: DealStatus): void
  (e: 'drop', deal: ICard, newStatus: DealStatus): void
}>()

const { isDraggingOver, onDragOver, onDragLeave, onDrop } = useDragAndDrop()

const statusColorValue = getStatusColor(column.status)
const dealCount = computed(() => column.cards.length)
const isEmpty = computed(() => dealCount.value === 0)

const handleDrop = (e: DragEvent) => {
  onDrop(e, $emit, column.status)
}

const openCreateDealWindow = () => {
  $emit('open-create-deal-window', column.status)
}
</script>

<template>
  <div
    class="select-none rounded-xl bg-secondary p-4 min-h-[500px] flex flex-col transition-colors duration-200"
    :class="{ 'ring-2 ring-primary/50': isDraggingOver }"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="handleDrop"
  >
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
      <template v-if="!isEmpty">
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
      </template>
      <div v-show="isEmpty" class="flex flex-col items-center justify-center h-full text-muted-foreground">
        <p class="text-sm mb-2">No deals in this column</p>
        <p class="text-xs">
          Drag and drop deals here or
          <span role="button" class="font-bold text-white cursor-pointer" @click="openCreateDealWindow">
            add a new deal
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
