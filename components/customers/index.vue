<script setup lang="ts">
const appStore = useAppStore()
const { startLoading, stopLoading } = appStore
const { data: customers, status, error } = useCustomersQuery()

watch(status, (newStatus) => {
  if (newStatus === 'pending') {
    startLoading('customers')
  } else {
    stopLoading('customers')
  }
})

watch(error, (newError) => {
  if (newError) {
    showErrorToast(newError)
  }
})
</script>

<template>
  <UiTable>
    <UiTableCaption>A list of your customers</UiTableCaption>
    <UiTableHeader>
      <UiTableRow>
        <UiTableHead class="w-[100px]">Image</UiTableHead>
        <UiTableHead class="w-[200px]">Name</UiTableHead>
        <UiTableHead class="w-[200px]">Email</UiTableHead>
        <UiTableHead>From source</UiTableHead>
      </UiTableRow>
    </UiTableHeader>
    <UiTableBody>
      <UiTableRow v-for="customer in customers" :key="customer.$id">
        <UiTableCell>
          <NuxtLink :to="`/customers/${customer.$id}`">
            <UiAvatar>
              <UiAvatarImage :src="customer.avatar_url" title="Go to customer" />
            </UiAvatar>
          </NuxtLink>
        </UiTableCell>
        <UiTableCell>{{ customer.name }}</UiTableCell>
        <UiTableCell>{{ customer.email }}</UiTableCell>
        <UiTableCell>{{ customer.from_source }}</UiTableCell>
      </UiTableRow>
    </UiTableBody>
  </UiTable>
</template>
