interface IAuthStore {
  email: string
  name: string
  status: boolean
}

const getDefaultState = (): { user: IAuthStore } => ({
  user: {
    email: '',
    name: '',
    status: false
  }
})

export const useAuthStore = defineStore('auth', () => {
  const state = ref(getDefaultState())

  const isAuth = computed(() => state.value.user.status)

  const $reset = () => {
    state.value = getDefaultState()
  }

  const setUser = (user: IAuthStore) => {
    state.value.user = user
  }

  return { state, isAuth, $reset, setUser }
})
