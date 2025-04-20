<script setup lang="ts">
import type { ICard } from '@/types'

const { deal } = defineProps<{
  deal: ICard
}>()
</script>

<template>
  <UiCard ref="card" class="bg-secondary hover:bg-secondary/80">
    <UiCardHeader role="button">
      <UiCardTitle>{{ deal.name }}</UiCardTitle>
    </UiCardHeader>
    <UiCardContent>
      <p class="mb-1 text-sm text-muted-foreground">{{ deal.price }}</p>
      <p class="text-m">{{ deal.companyName }}</p>
    </UiCardContent>
    <UiCardFooter class="flex items-center justify-end">
      <span class="text-xs text-muted-foreground">{{ deal.createdAt }}</span>
    </UiCardFooter>
  </UiCard>
</template>
