import React from 'react'
import { AuthProvider } from './auth-context'
import { QueryClientProvider, QueryClient } from 'react-query'

export const AppProviders: React.FC = (props) => {
  const { children } = props
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  )
}
