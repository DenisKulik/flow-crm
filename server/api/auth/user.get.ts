export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return null
  }

  return {
    email: event.context.user.email,
    name: event.context.user.name,
    status: true
  }
})
