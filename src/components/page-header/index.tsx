import React, { ReactElement } from 'react'
import { Button } from 'antd'
import { useAuth } from '@/hooks'
import { resetRoute } from '@/utils/handle-route'
import { HeaderWrapper, NavBar, NavItem, NavLogo, UserBar } from './style'

function PageHeader(): ReactElement {
  const { logout, user } = useAuth()

  const logoClick = () => {
    // console.log(location)
    resetRoute()
  }

  return (
    <HeaderWrapper>
      <NavBar>
        <NavLogo onClick={logoClick} />
        <NavItem>項目</NavItem>
        <NavItem>用戶</NavItem>
      </NavBar>
      <UserBar gap={1}>
        <NavItem type="primary">Hi, {user?.name}</NavItem>
        <Button type="primary" onClick={logout}>
          登出
        </Button>
      </UserBar>

      {/* <Dropdown
          placement="topRight"
          overlay={
            <Menu>
              <Menu.Item key={'logout'}>
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <NavItem type="primary">Hi, {user?.name}</NavItem>
        </Dropdown> */}
    </HeaderWrapper>
  )
}

export default PageHeader
