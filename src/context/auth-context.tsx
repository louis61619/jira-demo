import React, { useCallback } from 'react'

import * as hadleAuth from '@/utils/handle-auth'
import { bootstrapUser } from '@/utils/boostrap-user'
import { useAsync, useMount } from '@/hooks'
import PageLoading from '@/components/page-status/PageLoading'
import PageError from '@/components/page-status/PageError'

import { AuthForm } from '@/types'
import { User } from '@/types/user'
import { useQueryClient } from 'react-query'

interface AuthContextProps {
  user: User | null
  login: (data: AuthForm) => Promise<void>
  register: (data: AuthForm) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = React.createContext<AuthContextProps | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider: React.FC = ({ children }) => {
  // const [isInit, setIsInit] = useState(false)
  // const [user, setUser] = useState<User | null>(null)
  const { data: user, isLoading, isError, error, run, setData: setUser } = useAsync<User | null>()
  const queryClient = useQueryClient()

  // point free: (user) => setUser(user) 等同於 setUser
  const login = (data: AuthForm) => hadleAuth.login(data).then(setUser)
  const register = (data: AuthForm) => hadleAuth.register(data).then(setUser)
  const logout = () =>
    hadleAuth.logout().then(() => {
      queryClient.clear()
      setUser(null)
    })

  useMount(
    useCallback(() => {
      run(bootstrapUser())
    }, [run])
    // const user = await boostrapUser()
    // setUser(user)
    // setIsInit(true)
  )

  if (isLoading) return <PageLoading />

  if (isError) return <PageError error={error || new Error()} />

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// export {}
