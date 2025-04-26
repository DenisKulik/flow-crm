<script setup lang="ts">
import type { ICard } from '@/types'

const { deal } = defineProps<{
  deal: ICard
}>()
</script>

<template>
  <UiCard ref="card" class="bg-card hover:bg-card/80 border-transparent hover:border-primary/20 transition-all group">
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
