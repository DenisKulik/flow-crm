<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

import { DealStatus } from '@/types'

import CreateDealWindow from './CreateDealWindow.vue'
import DealCard from './DealCard.vue'
import DealColumn from './DealColumn.vue'

useSeoMeta({ title: 'Home | Flow CRM' })

const { data: board } = useDealsQuery()

const isOpenCreateDealWindow = ref<boolean>(false)
const createDealStatus = ref<DealStatus>(DealStatus.todo)

const openCreateDealWindow = (status = DealStatus.todo) => {
  isOpenCreateDealWindow.value = true
  createDealStatus.value = status
}

const closeCreateDealWindow = () => {
  isOpenCreateDealWindow.value = false
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Deal Board</h1>
      <UiButton size="sm" class="gap-1" @click="openCreateDealWindow(DealStatus.todo)">
        <Plus class="h-4 w-4" />
        <span>Add Deal</span>
      </UiButton>
    </div>

    <div class="grid [grid-template-columns:repeat(5,1fr)] gap-6 min-h-[calc(100vh-160px)]">
      <DealColumn
        v-for="column in board"
        :key="column.status"
        :column="column"
        @open-create-deal-window="openCreateDealWindow"
      >
        <template #cards="{ cards }">
          <DealCard v-for="card in cards" :key="card.id" :deal="card" />
        </template>
      </DealColumn>
    </div>
  </div>

  <CreateDealWindow :is-open="isOpenCreateDealWindow" :status="createDealStatus" @close="closeCreateDealWindow" />
</template>
