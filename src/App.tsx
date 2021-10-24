import React from 'react'
import { useAuth } from '@/hooks'
import PageError from '@/components/page-status/PageError'
import ErrorBoundary from '@/components/error-boundary'

import Main from './page/main'
import Login from './page/login'

function App() {
  const { user } = useAuth()

  return (
    <ErrorBoundary fallbackRender={PageError}>
      <div className="App">{user ? <Main /> : <Login />}</div>
    </ErrorBoundary>
  )
}

export default App
