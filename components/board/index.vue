<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

import { useAppStore } from '@/stores/app.store'
import { DealStatus, type IDealForm, type IFormMethods } from '@/types'

import CreateDealWindow from './CreateDealWindow.vue'
import DealCard from './DealCard.vue'
import DealColumn from './DealColumn.vue'

useSeoMeta({ title: 'Home | Flow CRM' })

const appStore = useAppStore()
const { data: board, status } = useDealsQuery()

const isOpenCreateDealWindow = ref<boolean>(false)
const createDealStatus = ref<DealStatus>()
const dealForm = useTemplateRef<IFormMethods>('dealForm')

const openCreateDealWindow = (status = DealStatus.todo) => {
  isOpenCreateDealWindow.value = true
  createDealStatus.value = status
}

const closeCreateDealWindow = () => {
  isOpenCreateDealWindow.value = false
}

const createDeal = (values: IDealForm) => {
  console.log(values)
  closeCreateDealWindow()
}

watch(status, (newStatus) => {
  if (newStatus === 'pending') {
    appStore.startLoading('deals')
  } else {
    appStore.stopLoading('deals')
  }
})

watch(isOpenCreateDealWindow, (newIsOpen) => {
  if (!newIsOpen) {
    setTimeout(() => {
      dealForm.value?.resetForm()
      createDealStatus.value = undefined
    }, 300)
  }
})
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

  <CreateDealWindow
    ref="dealForm"
    :is-open="isOpenCreateDealWindow"
    :status="createDealStatus"
    @submit="createDeal"
    @close="closeCreateDealWindow"
  />
</template>
