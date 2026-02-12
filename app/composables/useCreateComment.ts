import { CommentService } from '~/api'

const commentService = new CommentService()

export const useCreateComment = (dealId: string) => {
  const createComment = async (text: string) => {
    await commentService.createComment(text, dealId)
  }

  return {
    createComment
  }
}
