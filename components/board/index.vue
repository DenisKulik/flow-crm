<script setup lang="ts">
import DealColumn from './DealColumn.vue'

useSeoMeta({ title: 'Home | Flow CRM' })

const { data: board } = useDealsQuery()
</script>

<template>
  <div class="grid [grid-template-columns:repeat(5,1fr)] gap-6 min-h-[calc(100vh-180px)]">
    <DealColumn v-for="column in board" :key="column.id" :column="column" />
  </div>
</template>
