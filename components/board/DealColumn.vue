<script setup lang="ts">
import type { IColumn } from '@/types'

import DealCard from './DealCard.vue'

const { column } = defineProps<{
  column: IColumn
}>()
</script>

<template>
  <div class="select-none">
    <h3 class="mb-3 text-lg font-bold">{{ column.name }}</h3>
    <DealCard v-for="deal in column.cards" :key="deal.id" :deal="deal" />
  </div>
</template>
