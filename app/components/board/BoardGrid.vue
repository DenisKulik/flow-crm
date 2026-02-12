<script setup lang="ts">
import type { DealStatus, ICard, IColumn } from '~/types'

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

const drop = (deal: ICard, newStatus: DealStatus): void => {
  $emit('drop', deal, newStatus)
}

const openCreateDealDialog = (status: DealStatus): void => {
  $emit('openCreateDealDialog', status)
}

const openDealInfoDrawer = (deal: ICard): void => {
  $emit('openDealInfoDrawer', deal)
}
</script>

<template>
  <div class="grid [grid-template-columns:repeat(5,1fr)] gap-6 min-h-[calc(100vh-140px)]">
    <DealColumn
      v-for="column in board"
      :key="column.status"
      :column="column"
      @drop="drop"
      @open-create-deal-dialog="openCreateDealDialog"
    >
      <template #cards="{ cards }">
        <DealCard v-for="card in cards" :key="card.id" :deal="card" @open-deal-info-drawer="openDealInfoDrawer" />
      </template>
    </DealColumn>
  </div>
</template>
