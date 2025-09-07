<script setup lang="ts">
import CustomerTable from '@/components/customers/index.vue'

useSeoMeta({ title: 'Customers | Flow CRM' })
</script>

<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-6">Customers</h1>
    <CustomerTable />
  </div>
</template>
