export const useCommentActions = (dealId: string) => {
  const createComment = async (text: string) => {
    await $fetch('/api/comments', {
      method: 'POST',
      credentials: 'include',
      body: { text, deal: dealId }
    })
  }

  const deleteComment = async (commentId: string) => {
    await $fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
  }

  return {
    createComment,
    deleteComment
  }
}
