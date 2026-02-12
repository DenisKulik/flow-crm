import { defineStore } from 'pinia'

import type { IUser } from '~/types'

const getDefaultState = (): { user: IUser } => ({
  user: {
    email: '',
    name: '',
    status: false
  }
})

export const useAuthStore = defineStore(
  'auth',
  () => {
    const state = ref(getDefaultState())

    const isAuth = computed(() => state.value.user.status)

    const $reset = () => {
      state.value = getDefaultState()
    }

    const setUser = (user: IUser) => {
      state.value.user = user
    }

    return { state, isAuth, $reset, setUser }
  },
  {
    persist: true
  }
)
