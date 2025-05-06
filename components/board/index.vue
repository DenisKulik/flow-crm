<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

import { useAppStore } from '@/stores/app.store'
import { DealStatus, type ICard, type IDealForm, type IFormMethods } from '@/types'

import CreateDealWindow from './CreateDealWindow.vue'
import DealCard from './DealCard.vue'
import DealColumn from './DealColumn.vue'

useSeoMeta({ title: 'Home | Flow CRM' })

const appStore = useAppStore()
const { data: board, status, refresh, error } = useDealsQuery()
const { createDeal, updateDeal } = useDeals()

const isOpenCreateDealWindow = ref<boolean>(false)
const createDealStatus = ref<DealStatus>()
const dealForm = useTemplateRef<IFormMethods>('dealForm')
const isLoading = ref<boolean>(false)

const openCreateDealWindow = (status = DealStatus.todo) => {
  isOpenCreateDealWindow.value = true
  createDealStatus.value = status
}

const closeCreateDealWindow = () => {
  isOpenCreateDealWindow.value = false
}

const createDealHandler = async (data: IDealForm) => {
  try {
    isLoading.value = true
    await createDeal(data)
    closeCreateDealWindow()
    await refresh()
    showSuccessToast(`Deal "${data.name}" created successfully`)
  } catch (error: unknown) {
    showErrorToast(error)
  } finally {
    isLoading.value = false
  }
}

const handleDrop = async (deal: ICard, newStatus: DealStatus) => {
  if (deal.status === newStatus) return

  try {
    isLoading.value = true
    await updateDeal(deal.id, { status: newStatus })
    await refresh()
    showSuccessToast(`Deal "${deal.name}" moved to ${newStatus}`)
  } catch (error: unknown) {
    showErrorToast(error)
  } finally {
    isLoading.value = false
  }
}

watch(status, (newStatus) => {
  if (newStatus === 'pending') {
    appStore.startLoading('deals')
  } else {
    appStore.stopLoading('deals')
  }
})

watch(error, (newError) => {
  if (newError) {
    showErrorToast(newError)
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
        @drop="handleDrop"
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
    :disabled="isLoading"
    @submit="createDealHandler"
    @close="closeCreateDealWindow"
  />
</template>
