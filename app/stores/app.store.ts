import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const isInitialized = ref(false)
  const loadingTasks = ref<Set<string>>(new Set())
  const isLoading = computed(() => loadingTasks.value.size > 0)

  const setInitialized = () => {
    isInitialized.value = true
  }

  const startLoading = (taskId: string) => {
    loadingTasks.value.add(taskId)
  }

  const stopLoading = (taskId: string) => {
    loadingTasks.value.delete(taskId)
  }

  return { isInitialized, isLoading, setInitialized, startLoading, stopLoading }
})
