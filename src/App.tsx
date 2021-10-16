import React from 'react'
import { useAuth } from '@/hooks'

import Main from './page/main'
import Login from './page/login'

function App() {
  const { user } = useAuth()

  return <div className="App">{user ? <Main /> : <Login />}</div>
}

export default App
