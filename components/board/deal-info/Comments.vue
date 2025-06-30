<script setup lang="ts">
const { dealId } = defineProps<{
  dealId: string
}>()

const { data, refresh, status, error } = useDealQuery(dealId)
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
      <template v-if="status === 'pending'">
        <div class="flex items-start gap-3 bg-muted/60 rounded-lg p-3 mb-2 animate-pulse">
          <div class="flex-shrink-0 w-9 h-9 rounded-full bg-primary/20" />
          <div class="flex-1 space-y-2">
            <div class="h-3 w-1/4 bg-primary/20 rounded" />
            <div class="h-3 w-3/4 bg-primary/20 rounded" />
          </div>
        </div>
      </template>
      <ul class="flex flex-col gap-2">
        <li v-for="(comment, id) in comments" :key="id" class="flex items-start gap-3 bg-muted/60 rounded-lg p-3">
          <div class="flex-shrink-0 w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="font-semibold text-sm text-foreground/80">User</span>
              <span class="text-xs text-muted-foreground">{{ formatDate(comment.$createdAt) }}</span>
            </div>
            <p class="text-sm text-foreground">{{ comment.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
