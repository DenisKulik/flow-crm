import { CommentService } from '@/api'

const commentService = new CommentService()

export const useCommentsQuery = (dealId: string) => {
  return useLazyAsyncData(`comments-${dealId}`, async () => commentService.getCommentsByDealId(dealId), {
    server: false,
    transform: transformComments
  })
}
