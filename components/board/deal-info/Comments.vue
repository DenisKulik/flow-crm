<script setup lang="ts">
const { dealId } = defineProps<{
  dealId: string
}>()

const { data, refresh, error } = useDealQuery(dealId)
const { createComment } = useCreateComment(dealId)

const comments = computed(() => data.value?.comments)

const commentValue = ref<string>('')

const addComment = async () => {
  try {
    await createComment(commentValue.value)
    commentValue.value = ''
    await refresh()
  } catch (error: unknown) {
    showErrorToast(error)
  }
}

watch(error, (newError) => {
  if (newError) {
    showErrorToast(newError)
  }
})
</script>

<template>
  <div>
    <h1 class="mb-2 text-lg font-medium">Comments</h1>
    <div class="flex flex-col items-start gap-2 mb-2">
      <UiInput v-model="commentValue" placeholder="Add a comment" @keyup.enter="addComment" />
      <UiButton @click="addComment">Send</UiButton>
    </div>
    <div class="overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
      <ul class="flex flex-col gap-2">
        <li v-for="(comment, id) in comments" :key="id">
          {{ comment.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
