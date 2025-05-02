export const useClientAsyncData = <T>(key: string, handler: () => Promise<T>) => {
  return useAsyncData(key, handler, {
    server: false,
    lazy: true,
    default: () => null
  })
}
