import React, { FormEvent, useState } from 'react'
import { useAuth } from '@/hooks'

type Tab = 'login' | 'register'

interface LoginProps {}

// 鴨子類型(duck typing) 只要符合接口 不管類型
const Login: React.FC<LoginProps> = (props) => {
  const { user, login, register } = useAuth()

  const [currentTab, setCurrentTab] = useState<Tab>('login')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value
    const data = { username, password }
    currentTab === 'login' ? login(data) : register(data)
    console.log('submit')
  }

  const changeTab = () => {
    setCurrentTab(currentTab === 'login' ? 'register' : 'login')
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        {currentTab === 'login' && (
          <div>
            登入成功，用戶名: {user?.name}
            token: {user?.token}
          </div>
        )}

        <div>
          <label htmlFor="username">用戶名</label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">密碼</label>
          <input type="text" id="password" />
        </div>
        <button type="submit">{currentTab === 'login' ? '登錄' : '註冊'}</button>
      </form>
      <button onClick={changeTab}>{currentTab === 'login' ? '切換註冊' : '切換登錄'}</button>
    </div>
  )
}

export default Login
