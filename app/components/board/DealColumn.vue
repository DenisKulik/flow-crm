<script setup lang="ts">
import { useDroppable } from '@dnd-kit/vue'
import { Plus } from 'lucide-vue-next'

import type { DealStatus, ICard, IColumn } from '@/types'

const { column } = defineProps<{
  column: IColumn
}>()

const $emit = defineEmits<{
  openCreateDealDialog: [status: DealStatus]
  drop: [deal: ICard, newStatus: DealStatus]
}>()

const root = ref<HTMLElement | null>(null)

const { isDropTarget } = useDroppable({
  id: column.status,
  element: root
})

const statusColorValue = getStatusColor(column.status)
const dealCount = computed(() => column.cards.length)
const isEmpty = computed(() => dealCount.value === 0)

const openCreateDealDialog = () => {
  $emit('openCreateDealDialog', column.status)
}
</script>

<template>
  <div
    ref="root"
    class="select-none rounded-xl bg-secondary p-4 flex flex-col overflow-hidden transition-colors duration-200"
    :class="{ 'ring-2 ring-primary/50': isDropTarget }"
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
    <div
      class="space-y-3 flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent"
    >
      <template v-if="!isEmpty">
        <slot name="cards" :cards="column.cards" />
        <div class="flex justify-center">
          <UiButton
            size="icon"
            variant="ghost"
            title="Add Deal"
            class="h-7 w-7 hover:opacity-80"
            @click="openCreateDealDialog"
          >
            <Plus class="h-4 w-4" />
          </UiButton>
        </div>
      </template>
      <div v-show="isEmpty" class="flex flex-col items-center justify-center h-full text-muted-foreground">
        <p class="text-sm mb-2">No deals in this column</p>
        <p class="text-xs">
          Drag and drop deals here or
          <span role="button" class="font-bold text-white cursor-pointer" @click="openCreateDealDialog">
            add a new deal
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
