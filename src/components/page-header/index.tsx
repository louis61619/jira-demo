import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { ReactComponent as Logo } from '@/assets/images/software-logo.svg'
import { HeaderWrapper, NavBar, NavItem, LogoWrapper, UserBar } from './style'
import ProjectPopover from './ProjectPopover'
import UserPopover from './UserPopover'

const NavLogo: React.FC = (props) => (
  <Link to="/">
    <LogoWrapper>
      <div>
        <Logo />
      </div>
    </LogoWrapper>
  </Link>
)

const PageHeader = () => {
  const { logout, user } = useAuth()

  return (
    <HeaderWrapper>
      <NavBar>
        <NavLogo />
        <ProjectPopover />
        <UserPopover />
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
