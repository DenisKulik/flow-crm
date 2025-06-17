<script setup lang="ts">
const { dealId } = defineProps<{
  dealId: string
}>()

const { data, status, error } = useDealQuery(dealId)
const comments = computed(() => data.value?.comments)
</script>

<template>
  <div>
    <h1>Comments</h1>
    <p v-show="status === 'pending'">Loading comments...</p>
    <p v-show="status === 'error'">Error loading comments: {{ error }}</p>
    <div v-show="status === 'success'">
      <ul>
        <li v-for="(comment, id) in comments" :key="id">
          {{ comment.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
