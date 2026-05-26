import type { CommentListDBType } from '@/types'

export const useCommentsQuery = (dealId: string) => {
  return useLazyAsyncData(`comments-${dealId}`, () => $fetch<CommentListDBType>(`/api/comments/${dealId}`), {
    transform: transformComments
  })
}
