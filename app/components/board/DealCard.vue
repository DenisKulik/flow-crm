<script setup lang="ts">
import { useDraggable } from '@dnd-kit/vue'

import type { ICard } from '@/types'

const { deal } = defineProps<{
  deal: ICard
}>()

const $emit = defineEmits<{
  openDealInfoDrawer: [deal: ICard]
}>()

const element = ref<HTMLElement | null>(null)

const { isDragging } = useDraggable({
  id: deal.id,
  element
})

const draggingClass = computed(() => ({
  'opacity-50 scale-[0.98]': isDragging.value
}))

const openDealInfoDrawer = () => {
  $emit('openDealInfoDrawer', deal)
}
</script>

<template>
  <UiCard
    ref="element"
    class="bg-card hover:bg-card/80 border-transparent hover:border-primary/20 transition-all group cursor-pointer"
    :class="draggingClass"
    title="Double click or drag"
    @dblclick="openDealInfoDrawer"
  >
    <UiCardHeader role="button" class="pb-2">
      <div class="flex justify-between">
        <UiCardTitle class="truncate">{{ deal.name }}</UiCardTitle>
      </div>
    </UiCardHeader>
    <UiCardContent class="pb-2">
      <p class="mb-1 text-sm text-muted-foreground">{{ deal.price }}</p>
      <p class="text-md font-medium">{{ deal.companyName }}</p>
    </UiCardContent>
    <UiCardFooter class="flex items-center justify-end pt-0">
      <span class="text-xs text-muted-foreground">{{ deal.createdAt }}</span>
    </UiCardFooter>
  </UiCard>
</template>
