<script setup lang="ts">
import { Building2, Calendar, DollarSign, FileText, Tag } from 'lucide-vue-next'
import { computed } from 'vue'

import { DEAL_STATUS_LABELS, LABEL_TEXT } from '@/constants'
import type { ICard } from '@/types'

const props = defineProps<{
  deal: ICard
}>()

const preparedDeal = computed(() => [
  { key: 'name', label: LABEL_TEXT.name, value: props.deal.name, icon: FileText },
  { key: 'price', label: LABEL_TEXT.price, value: props.deal.price, icon: DollarSign },
  { key: 'company', label: LABEL_TEXT.companyName, value: props.deal.companyName, icon: Building2 },
  { key: 'status', label: LABEL_TEXT.status, value: DEAL_STATUS_LABELS[props.deal.status], icon: Tag },
  { key: 'created', label: LABEL_TEXT.createdAt, value: props.deal.createdAt, icon: Calendar }
])
</script>

<template>
  <div class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
    <div class="flex flex-col gap-4 p-4">
      <BoardDealInfoItem v-for="item in preparedDeal" :key="item.key" :label-text="item.label!" :label-icon="item.icon">
        <div class="flex items-center gap-2">
          <UiBadge v-if="item.key === 'status'" variant="outline" class="font-medium">
            {{ item.value }}
          </UiBadge>
          <p v-else class="font-medium text-foreground">{{ item.value }}</p>
        </div>
      </BoardDealInfoItem>
    </div>
  </div>
</template>
