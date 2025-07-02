<script setup lang="ts">
const { dealId } = defineProps<{
  dealId: string
}>()

const { data, refresh, status, error } = useDealQuery(dealId)
const { createComment } = useCreateComment(dealId)

const comments = computed(() =>
  data.value?.comments.map((comment) => ({ ...comment, $createdAt: formatDate(comment.$createdAt) }))
)

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
    <div class="flex items-start gap-2 mb-2">
      <UiInput v-model="commentValue" placeholder="Add a comment" :maxlength="400" @keyup.enter="addComment" />
      <UiButton @click="addComment">Send</UiButton>
    </div>
    <div class="overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
      <ul class="flex flex-col gap-2">
        <BoardDealInfoComment v-for="(comment, id) in comments" :key="id" :comment="comment" />
      </ul>
      <template v-if="status === 'pending'">
        <BoardDealInfoCommentSkeleton v-for="i in 3" :key="i" />
      </template>
    </div>
  </div>
</template>
