import { CommentService } from '@/api'

const commentService = new CommentService()

export const useCommentsQuery = (dealId: string) => {
  return useClientAsyncData(`comments-${dealId}`, async () => {
    const data = await commentService.getCommentsByDealId(dealId)
    return transformComments(data)
  })
}
