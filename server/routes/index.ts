export default defineEventHandler(async (event) => {
  if (event.context.user) {
    await sendRedirect(event, '/')
  }

  await sendRedirect(event, '/auth')
})
