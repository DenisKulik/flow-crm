export const useAppStore = defineStore('app', () => {
  const loadingTasks = ref<Set<string>>(new Set())
  const isLoading = computed(() => loadingTasks.value.size > 0)

  const startLoading = (taskId: string) => {
    loadingTasks.value.add(taskId)
  }

  const stopLoading = (taskId: string) => {
    loadingTasks.value.delete(taskId)
  }

  return { isLoading, startLoading, stopLoading }
})
