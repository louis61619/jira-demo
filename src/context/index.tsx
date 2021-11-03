import React from 'react'

import { QueryClientProvider, QueryClient } from 'react-query'
import { Provider } from 'react-redux'

import { store } from '@/store'
import { AuthProvider } from './auth-context'

export const AppProviders: React.FC = (props) => {
  const { children } = props
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </Provider>
  )
}
