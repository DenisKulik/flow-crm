<script setup lang="ts">
import { useAppStore } from '~/stores/app.store'
import { DealStatus, type ICard, type IDealForm, type IFormMethods } from '~/types'

import BoardGrid from './BoardGrid.vue'
import BoardHeader from './BoardHeader.vue'
import CreateDealDialog from './CreateDealDialog.vue'

useSeoMeta({ title: 'Home | Flow CRM' })

const appStore = useAppStore()
const { startLoading, stopLoading } = appStore
const { data: board, status, refresh, error } = useDealsQuery()
const { createDeal, updateDeal } = useDeals()

const isOpenCreateDealDialog = ref<boolean>(false)
const createDealStatus = ref<DealStatus>()
const crateDealForm = useTemplateRef<IFormMethods>('crateDealForm')
const isCreatingDeal = ref<boolean>(false)

const isOpenDealInfoDrawer = ref<boolean>(false)
const chosenDealInfo = ref<ICard>()

const openCreateDealDialog = (status = DealStatus.todo) => {
  isOpenCreateDealDialog.value = true
  createDealStatus.value = status
}

const closeCreateDealDialog = () => {
  isOpenCreateDealDialog.value = false
}

const createDealHandler = async (deal: IDealForm) => {
  try {
    isCreatingDeal.value = true
    await createDeal(deal)
    closeCreateDealDialog()
    showSuccessToast(`Deal "${deal.name}" created successfully`)
    await refresh()
  } catch (error: unknown) {
    showErrorToast(error)
  } finally {
    isCreatingDeal.value = false
  }
}

const openDealInfoDrawer = (deal: ICard) => {
  isOpenDealInfoDrawer.value = true
  chosenDealInfo.value = deal
}

const closeDealInfoDrawer = () => {
  isOpenDealInfoDrawer.value = false
  chosenDealInfo.value = undefined
}

const changeDealStatus = async (card: ICard, newStatus: DealStatus) => {
  if (card.status === newStatus) return

  try {
    startLoading('change-deal-status')
    await updateDeal(card.id, { status: newStatus })
    showSuccessToast(`Deal "${card.name}" moved to ${newStatus}`)
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

watch(isOpenCreateDealDialog, (newIsOpen) => {
  if (!newIsOpen) {
    setTimeout(() => {
      crateDealForm.value?.resetForm()
      createDealStatus.value = undefined
    }, 300)
  }
})
</script>

<template>
  <BoardHeader class="mb-6" @open-create-deal-dialog="openCreateDealDialog" />
  <BoardGrid
    :board="board"
    @drop="changeDealStatus"
    @open-create-deal-dialog="openCreateDealDialog"
    @open-deal-info-drawer="openDealInfoDrawer"
  />
  <CreateDealDialog
    ref="crateDealForm"
    :is-open="isOpenCreateDealDialog"
    :status="createDealStatus"
    :disabled="isCreatingDeal"
    @submit="createDealHandler"
    @close="closeCreateDealDialog"
  />
  <BoardDealInfo :is-open="isOpenDealInfoDrawer" :deal="chosenDealInfo" @close="closeDealInfoDrawer" />
</template>
