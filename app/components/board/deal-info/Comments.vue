<script setup lang="ts">
import { Loader } from 'lucide-vue-next'

const { dealId } = defineProps<{
  dealId: string
}>()

const { data: comments, refresh, status, error } = useCommentsQuery(dealId)
const { createComment, deleteComment } = useCommentActions(dealId)

const commentValue = ref<string>('')
const firstLoading = ref(true)

const addComment = async () => {
  if (!commentValue.value.trim()) return

  try {
    await createComment(commentValue.value)
    commentValue.value = ''
    await refresh()
  } catch (error: unknown) {
    showErrorToast(error)
  }
}

const deleteCommentHandler = async (id: string) => {
  try {
    await deleteComment(id)
    await refresh()
  } catch (error: unknown) {
    showErrorToast(error)
  }
}

watch(status, () => {
  if (firstLoading.value && status.value !== 'pending') {
    firstLoading.value = false
  }
})

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
      <UiButton :disabled="!commentValue || status === 'pending'" @click="addComment">
        <Loader v-show="!firstLoading && status === 'pending'" class="h-4 w-4 animate-spin" />
        <span>Send</span>
      </UiButton>
    </div>
    <div class="overflow-y-auto scrollbar-thin scrollbar-thumb-secondary scrollbar-track-transparent">
      <ul class="flex flex-col gap-2 mb-2">
        <BoardDealInfoComment
          v-for="comment in comments"
          :key="comment.$id"
          :comment="comment"
          @delete="deleteCommentHandler(comment.$id)"
        />
      </ul>
      <template v-if="firstLoading && status === 'pending'">
        <BoardDealInfoCommentSkeleton v-for="i in 3" :key="i" />
      </template>
    </div>
  </div>
</template>
