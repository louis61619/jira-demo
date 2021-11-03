import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as authStore from '@/store/auth'
import { AuthForm, User } from '@/types'

export const useAuth = () => {
  // 需要做顯示聲明
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()

  return {
    login: useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch]),
    register: useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch]),
    logout: useCallback(() => dispatch(authStore.logout()), [dispatch]),
    user: useSelector(authStore.selectUser)
  }
}
