export const useClientAsyncData = <T>(key: string, handler: () => Promise<T>, options?: { default: () => T }) => {
  return useAsyncData(key, handler, {
    server: false,
    lazy: true,
    default: options?.default || (() => null as T)
  })
}
