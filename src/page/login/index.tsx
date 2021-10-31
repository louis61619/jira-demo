import React, { useState } from 'react'
import { Form, Button, Input, Divider, Typography } from 'antd'

import { useAuth, useAsync, useUnMount, useDocumentTitle } from '@/hooks'

import { Container, CardWrapper, Logo, LongButton, ErrorWrapper } from './style'

type Tab = 'login' | 'register'

// 使用antd重寫

const Login: React.FC = (props) => {
  const { login, register } = useAuth()
  const [form] = Form.useForm()

  const [currentTab, setCurrentTab] = useState<Tab>('login')
  const [error, setError] = useState<Error | null>(null)
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  useUnMount()
  useDocumentTitle('請登入註冊以繼續')

  const handleSubmit = async ({
    cpassword,
    ...value
  }: {
    username: string
    password: string
    cpassword?: string
  }) => {
    if (currentTab === 'register') {
      if (value.password !== cpassword) {
        return setError(new Error('請確認兩次輸入的密碼相同'))
      }
    }
    const request = currentTab === 'login' ? login : register
    // run(request(value))
    try {
      // 注意如果用trycatch捕捉錯誤要用await
      // await request(value)
      await run(request(value))
      // console.log(res)
    } catch (e: any) {
      setError(e)
    }
  }

  const changeTab = () => {
    setCurrentTab(currentTab === 'login' ? 'register' : 'login')
    setError(null)
    form.resetFields()
  }

  return (
    <Container>
      <CardWrapper>
        <Logo />
        <ErrorWrapper>
          {error && <Typography.Text type="danger">{error.message}</Typography.Text>}
        </ErrorWrapper>
        <Form form={form} onFinish={(value) => handleSubmit(value)}>
          <Form.Item name="username" rules={[{ required: true, message: '請輸入用戶名' }]}>
            <Input autoComplete="" placeholder="用戶名" type="text" id="username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '請輸入密碼' }]}>
            <Input autoComplete="" placeholder="密碼" type="password" id="password" />
          </Form.Item>
          {currentTab === 'register' && (
            <Form.Item name="cpassword" rules={[{ required: true, message: '請確認密碼' }]}>
              <Input
                autoComplete="new-password"
                placeholder="確認密碼"
                type="password"
                id="cpassword"
              />
            </Form.Item>
          )}
          <LongButton loading={isLoading} htmlType="submit" type="primary">
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
