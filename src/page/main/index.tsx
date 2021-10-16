import React from 'react'
import { useAuth } from '@/hooks'
import ProjectList from './project-list'

interface MainProps {}

const Main = (props: MainProps) => {
  const { logout } = useAuth()
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectList />
    </div>
  )
}

export default Main
