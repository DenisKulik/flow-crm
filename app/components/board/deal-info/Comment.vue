<script setup lang="ts">
import { Trash } from 'lucide-vue-next'

import type { IComment } from '@/types'

defineProps<{
  comment: IComment
}>()

const $emit = defineEmits(['delete'])
</script>

<template>
  <li class="flex items-start justify-between gap-3 bg-muted/60 rounded-lg p-3">
    <div class="flex items-start gap-3">
      <div class="flex-shrink-0 w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
        <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 8-4 8-4s8 0 8 4" />
        </svg>
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span class="font-semibold text-sm text-foreground/80">User</span>
          <span class="text-xs text-muted-foreground">{{ comment.$createdAt }}</span>
        </div>
        <p class="text-sm text-foreground">{{ comment.text }}</p>
      </div>
    </div>

    <UiButton variant="ghost" size="icon" class="gap-1" @click="$emit('delete')">
      <Trash class="h-4 w-4" />
    </UiButton>
  </li>
</template>
