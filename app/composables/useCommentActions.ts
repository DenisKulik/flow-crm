export const useCommentActions = (dealId: string) => {
  const createComment = async (text: string) => {
    await $fetch('/api/comments', {
      method: 'POST',
      body: { text, deal: dealId }
    })
  }

  const deleteComment = async (commentId: string) => {
    await $fetch(`/api/comments/${commentId}`, {
      method: 'DELETE'
    })
  }

  return {
    createComment,
    deleteComment
  }
}
