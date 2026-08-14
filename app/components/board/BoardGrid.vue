<script setup lang="ts">
import type { DealStatus, ICard, IColumn } from '@/types'

import DealCard from './DealCard.vue'
import DealColumn from './DealColumn.vue'

defineProps<{
  board: IColumn[]
}>()

const $emit = defineEmits<{
  drop: [deal: ICard, newStatus: DealStatus]
  openCreateDealDialog: [status: DealStatus]
  openDealInfoDrawer: [deal: ICard]
}>()

const openCreateDealDialog = (status: DealStatus): void => {
  $emit('openCreateDealDialog', status)
}

const openDealInfoDrawer = (deal: ICard): void => {
  $emit('openDealInfoDrawer', deal)
}
</script>

<template>
  <div class="grid flex-1 min-h-0 [grid-template-columns:repeat(5,1fr)] [grid-template-rows:minmax(0,1fr)] gap-6">
    <DealColumn
      v-for="column in board"
      :key="column.status"
      :column="column"
      @open-create-deal-dialog="openCreateDealDialog"
    >
      <template #cards="{ cards }">
        <DealCard v-for="card in cards" :key="card.id" :deal="card" @open-deal-info-drawer="openDealInfoDrawer" />
      </template>
    </DealColumn>
  </div>
</template>
