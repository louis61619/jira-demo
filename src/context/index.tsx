import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth-context'
import { QueryClientProvider, QueryClient } from 'react-query'

export const AppProviders: React.FC = (props) => {
  const { children } = props
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
