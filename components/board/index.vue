<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

import DealCard from './DealCard.vue'
import DealColumn from './DealColumn.vue'

useSeoMeta({ title: 'Home | Flow CRM' })

const { data: board } = useDealsQuery()
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Deal Board</h1>
      <UiButton size="sm" class="gap-1">
        <Plus class="h-4 w-4" />
        <span>Add Deal</span>
      </UiButton>
    </div>

    <div class="grid [grid-template-columns:repeat(5,1fr)] gap-6 min-h-[calc(100vh-160px)]">
      <DealColumn v-for="column in board" :key="column.id" :column="column">
        <template #cards="{ cards }">
          <DealCard v-for="card in cards" :key="card.id" :deal="card" />
        </template>
      </DealColumn>
    </div>
  </div>
</template>
