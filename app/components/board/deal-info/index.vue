<script setup lang="ts">
import { X } from 'lucide-vue-next'

import type { ICard } from '@/types'

const { isOpen, deal } = defineProps<{
  isOpen: boolean
  deal?: ICard
}>()

const $emit = defineEmits<{
  close: []
}>()

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
            <BoardDealInfoList v-if="deal" :deal />
            <p v-else class="text-center text-sm text-muted-foreground">No deal selected</p>
          </div>
          <div class="flex flex-col gap-4 p-4">
            <BoardDealInfoComments v-if="deal" :deal-id="deal.id" />
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
