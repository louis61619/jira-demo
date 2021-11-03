import React, { useCallback } from 'react'

import { useDispatch } from 'react-redux'
import { bootstrap } from '@/store/auth'
import { useAsync, useMount } from '@/hooks'
import PageLoading from '@/components/page-status/PageLoading'
import PageError from '@/components/page-status/PageError'

import { User } from '@/types'

// interface AuthContextProps {
//   user: User | null
//   login: (data: AuthForm) => Promise<void>
//   register: (data: AuthForm) => Promise<void>
//   logout: () => Promise<void>
// }

// export const AuthContext = React.createContext<AuthContextProps | undefined>(undefined)
// AuthContext.displayName = 'AuthContext'

export const AuthProvider: React.FC = ({ children }) => {
  // const [isInit, setIsInit] = useState(false)
  // const [user, setUser] = useState<User | null>(null)
  const { isLoading, isError, error, run } = useAsync<User | null>()

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()

  useMount(
    useCallback(() => {
      run(dispatch(bootstrap()))
    }, [run, dispatch])
    // const user = await boostrapUser()
    // setUser(user)
    // setIsInit(true)
  )

  if (isLoading) return <PageLoading />

  if (isError) return <PageError error={error || new Error()} />

  return <>{children}</>
}

// export {}
