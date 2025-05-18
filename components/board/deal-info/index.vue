<script setup lang="ts">
import { Building2, Calendar, DollarSign, FileText, Tag, X } from 'lucide-vue-next'

import { DEAL_STATUS_LABELS, LABEL_TEXT } from '@/constants'
import type { ICard } from '@/types'

const { isOpen, deal } = defineProps<{
  isOpen: boolean
  deal?: ICard
}>()

const $emit = defineEmits<{
  close: []
}>()

const preparedDeal = computed(() => {
  if (!deal) return []

  return [
    { key: 'name', label: LABEL_TEXT.name, value: deal.name, icon: FileText },
    { key: 'price', label: LABEL_TEXT.price, value: deal.price, icon: DollarSign },
    { key: 'company', label: LABEL_TEXT.companyName, value: deal.companyName, icon: Building2 },
    { key: 'status', label: LABEL_TEXT.status, value: DEAL_STATUS_LABELS[deal.status], icon: Tag },
    { key: 'created', label: LABEL_TEXT.createdAt, value: deal.createdAt, icon: Calendar }
  ]
})

const openHandler = (isOpen: boolean) => {
  if (!isOpen) {
    $emit('close')
  }
}
</script>

<template>
  <UiDrawer :open="isOpen" direction="right" @update:open="openHandler">
    <UiDrawerContent>
      <div class="flex h-full flex-col">
        <UiDrawerHeader>
          <div class="flex items-center justify-between">
            <UiDrawerTitle>About Deal</UiDrawerTitle>
            <UiDrawerClose>
              <UiButton variant="ghost" size="icon">
                <X class="h-4 w-4" />
              </UiButton>
            </UiDrawerClose>
          </div>
          <UiDrawerDescription>View deal details and leave comments</UiDrawerDescription>
        </UiDrawerHeader>
        <div class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
          <div class="flex flex-col gap-4 p-4">
            <BoardDealInfoItem v-for="item in preparedDeal" :key="item.key" :label-text="item.label">
              <div class="flex items-center gap-2">
                <component :is="item.icon" class="h-4 w-4 text-muted-foreground" />
                <UiBadge v-if="item.key === 'status'" variant="outline" class="font-medium">
                  {{ item.value }}
                </UiBadge>
                <p v-else class="font-medium text-foreground">{{ item.value }}</p>
              </div>
            </BoardDealInfoItem>
          </div>
        </div>
        <UiDrawerFooter>
          <UiDrawerClose class="ml-auto">
            <UiButton variant="outline">Cancel</UiButton>
          </UiDrawerClose>
        </UiDrawerFooter>
      </div>
    </UiDrawerContent>
  </UiDrawer>
</template>
