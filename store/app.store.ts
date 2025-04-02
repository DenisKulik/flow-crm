export const useAppStore = defineStore('app', () => {
  const isLoading = ref<boolean>(false)

  const setLoading = (value: boolean) => {
    isLoading.value = value
  }

  return { isLoading, setLoading }
})
