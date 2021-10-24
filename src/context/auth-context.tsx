import React from 'react'

import * as hadleAuth from '@/utils/handle-auth'
import { boostrapUser } from '@/utils/boostrap-user'
import { useAsync, useMount } from '@/hooks'
import PageLoading from '@/components/page-status/PageLoading'
import PageError from '@/components/page-status/PageError'

import { AuthForm, User } from '@/types'

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

  // point free: (user) => setUser(user) 等同於 setUser
  const login = (data: AuthForm) => hadleAuth.login(data).then(setUser)
  const register = (data: AuthForm) => hadleAuth.register(data).then(setUser)
  const logout = () => hadleAuth.logout().then(() => setUser(null))

  useMount(() => {
    run(boostrapUser())
    // const user = await boostrapUser()
    // setUser(user)
    // setIsInit(true)
  })

  if (isLoading) return <PageLoading />

  if (isError) return <PageError error={error || new Error()} />

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// export {}
