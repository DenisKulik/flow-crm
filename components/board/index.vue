<script setup lang="ts">
import { useAppStore } from '@/stores/app.store'
import { DealStatus, type ICard, type IDealForm, type IFormMethods } from '@/types'

import BoardGrid from './BoardGrid.vue'
import BoardHeader from './BoardHeader.vue'
import CreateDealWindow from './CreateDealWindow.vue'

useSeoMeta({ title: 'Home | Flow CRM' })

const appStore = useAppStore()
const { startLoading, stopLoading } = appStore
const { data: board, status, refresh, error } = useDealsQuery()
const { createDeal, updateDeal } = useDeals()

const isOpenCreateDealWindow = ref<boolean>(false)
const createDealStatus = ref<DealStatus>()
const dealForm = useTemplateRef<IFormMethods>('dealForm')
const isCreatingDeal = ref<boolean>(false)

const openCreateDealWindow = (status = DealStatus.todo) => {
  isOpenCreateDealWindow.value = true
  createDealStatus.value = status
}

const closeCreateDealWindow = () => {
  isOpenCreateDealWindow.value = false
}

const createDealHandler = async (data: IDealForm) => {
  try {
    isCreatingDeal.value = true
    await createDeal(data)
    closeCreateDealWindow()
    showSuccessToast(`Deal "${data.name}" created successfully`)
    await refresh()
  } catch (error: unknown) {
    showErrorToast(error)
  } finally {
    isCreatingDeal.value = false
  }
}

const changeDealStatus = async (deal: ICard, newStatus: DealStatus) => {
  if (deal.status === newStatus) return

  try {
    startLoading('change-deal-status')
    await updateDeal(deal.id, { status: newStatus })
    showSuccessToast(`Deal "${deal.name}" moved to ${newStatus}`)
    await refresh()
  } catch (error: unknown) {
    showErrorToast(error)
  } finally {
    stopLoading('change-deal-status')
  }
}

watch(status, (newStatus) => {
  if (newStatus === 'pending') {
    startLoading('deals')
  } else {
    stopLoading('deals')
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
  <BoardHeader class="mb-6" @open-create-deal-window="openCreateDealWindow" />
  <BoardGrid v-if="board" :board="board" @open-create-deal-window="openCreateDealWindow" @drop="changeDealStatus" />
  <CreateDealWindow
    ref="dealForm"
    :is-open="isOpenCreateDealWindow"
    :status="createDealStatus"
    :disabled="isCreatingDeal"
    @submit="createDealHandler"
    @close="closeCreateDealWindow"
  />
</template>
