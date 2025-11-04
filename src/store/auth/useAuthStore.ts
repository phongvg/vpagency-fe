import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AuthState } from '@/store/auth/types'
import { ACCESS_TOKEN_KEY } from '@/constants/app.constant'
import { localStorageUtils } from '@/utils/storage'

const tokenStorage = typeof window !== 'undefined' ? localStorageUtils.getItem(ACCESS_TOKEN_KEY) : null

const initialState = {
  isAuthenticated: !!tokenStorage,
  token: tokenStorage,
  user: null,
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    ...initialState,

    setSession: (token, user) => {
      set({
        token,
        user,
        isAuthenticated: !!token,
      })

      if (typeof window !== 'undefined') {
        if (token) {
          localStorageUtils.setItem(ACCESS_TOKEN_KEY, token)
        } else {
          localStorageUtils.removeItem(ACCESS_TOKEN_KEY)
        }
      }
    },
    updateUser: (user) => {
      set({
        user,
      })
    },
    clearSession: () => {
      set({
        isAuthenticated: false,
        token: null,
        user: null,
      })

      if (typeof window !== 'undefined') {
        localStorageUtils.removeItem(ACCESS_TOKEN_KEY)
      }
    },
  })),
)
