<script setup lang="ts">
import type { DealStatus, ICard, IColumn } from '@/types'

import DealCard from './DealCard.vue'
import DealColumn from './DealColumn.vue'

defineProps<{
  board: IColumn[]
}>()

defineEmits<{
  openCreateDealWindow: [status: DealStatus]
  drop: [deal: ICard, newStatus: DealStatus]
}>()
</script>

<template>
  <div class="grid [grid-template-columns:repeat(5,1fr)] gap-6 min-h-[calc(100vh-140px)]">
    <DealColumn
      v-for="column in board"
      :key="column.status"
      :column="column"
      @open-create-deal-window="$emit('openCreateDealWindow', $event)"
      @drop="(deal, newStatus) => $emit('drop', deal, newStatus)"
    >
      <template #cards="{ cards }">
        <DealCard v-for="card in cards" :key="card.id" :deal="card" />
      </template>
    </DealColumn>
  </div>
</template>
