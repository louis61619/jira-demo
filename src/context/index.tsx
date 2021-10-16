import React from 'react'
import { AuthProvider } from './auth-context'

export const AppProviders: React.FC = (props) => {
  const { children } = props
  return <AuthProvider>{children}</AuthProvider>
}
