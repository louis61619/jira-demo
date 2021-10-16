import React, { useState } from 'react'
import * as hadleAuth from '@/utils/handle-auth'

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
  const [user, setUser] = useState<User | null>(null)

  // point free: (user) => setUser(user) 等同於 setUser
  const login = (data: AuthForm) => hadleAuth.login(data).then(setUser)
  const register = (data: AuthForm) => hadleAuth.register(data).then(setUser)
  const logout = () => hadleAuth.logout().then(() => setUser(null))

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// export {}
