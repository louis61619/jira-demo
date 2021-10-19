import React from 'react'
import { Button } from 'antd'
import { useAuth } from '@/hooks'
import ProjectList from './project-list'

interface MainProps {}

const Main = (props: MainProps) => {
  const { logout } = useAuth()
  return (
    <div>
      <Button type="primary" onClick={logout}>
        登出
      </Button>
      <ProjectList />
    </div>
  )
}

export default Main
