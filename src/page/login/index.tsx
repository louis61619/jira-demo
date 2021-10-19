import React, { useState } from 'react'
import { Form, Button, Input, Divider } from 'antd'

import { useAuth } from '@/hooks'

import { Container, CardWrapper, Logo, LongButton } from './style'

type Tab = 'login' | 'register'

// 使用antd重寫

const Login: React.FC = (props) => {
  const { login, register } = useAuth()

  const [currentTab, setCurrentTab] = useState<Tab>('login')

  const handleSubmit = (value: any) => {
    currentTab === 'login' ? login(value) : register(value)
  }

  const changeTab = () => {
    setCurrentTab(currentTab === 'login' ? 'register' : 'login')
  }

  return (
    <Container>
      <CardWrapper>
        <Logo />
        <Form onFinish={(value) => handleSubmit(value)}>
          <Form.Item name="username" rules={[{ required: true, message: '請輸入用戶名' }]}>
            <Input placeholder="用戶名" type="text" id="username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '請輸入密碼' }]}>
            <Input placeholder="密碼" type="text" id="password" />
          </Form.Item>
          <LongButton htmlType="submit" type="primary">
            {currentTab === 'login' ? '登錄' : '註冊'}
          </LongButton>
        </Form>
        <Divider />
        <Button type="link" onClick={changeTab}>
          {currentTab === 'login' ? '沒有帳號？註冊新帳號' : '已經有帳號了？直接登錄'}
        </Button>
      </CardWrapper>
    </Container>
  )
}

export default Login

// 鴨子類型(duck typing) 只要符合接口 不管類型
// const Login: React.FC<LoginProps> = (props) => {
//   const { user, login, register } = useAuth()

//   const [currentTab, setCurrentTab] = useState<Tab>('login')

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const username = (e.currentTarget.elements[0] as HTMLInputElement).value
//     const password = (e.currentTarget.elements[1] as HTMLInputElement).value
//     const data = { username, password }
//     currentTab === 'login' ? login(data) : register(data)
//     console.log('submit')
//   }

//   const changeTab = () => {
//     setCurrentTab(currentTab === 'login' ? 'register' : 'login')
//   }

//   return (
//     <div>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         {currentTab === 'login' && (
//           <div>
//             登入成功，用戶名: {user?.name}
//             token: {user?.token}
//           </div>
//         )}

//         <div>
//           <label htmlFor="username">用戶名</label>
//           <input type="text" id="username" />
//         </div>
//         <div>
//           <label htmlFor="password">密碼</label>
//           <input type="text" id="password" />
//         </div>
//         <button type="submit">{currentTab === 'login' ? '登錄' : '註冊'}</button>
//       </form>
//       <button onClick={changeTab}>{currentTab === 'login' ? '切換註冊' : '切換登錄'}</button>
//     </div>
//   )
// }
