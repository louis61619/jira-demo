import React from 'react'
import { Button } from 'antd'
import { useAuth } from '@/hooks'
import { resetRoute } from '@/utils/handle-route'
import { HeaderWrapper, NavBar, NavItem, LogoWrapper, UserBar } from './style'
import ProjectPopover from '@/components/project-popover'
import { ReactComponent as Logo } from '@/assets/images/software-logo.svg'

const NavLogo: React.FC<{ onClick: React.MouseEventHandler<HTMLElement> }> = (props) => (
  <LogoWrapper {...props}>
    <div>
      <Logo />
    </div>
  </LogoWrapper>
)

const PageHeader = () => {
  const { logout, user } = useAuth()

  const logoClick = () => {
    // console.log(location)
    resetRoute()
  }

  return (
    <HeaderWrapper>
      <NavBar>
        <NavLogo onClick={logoClick} />
        <ProjectPopover />
        <NavItem>用戶</NavItem>
      </NavBar>
      <UserBar gap={1}>
        <NavItem type="primary" mobileHidden={true}>
          Hi, {user?.name}
        </NavItem>
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
