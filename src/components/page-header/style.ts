import styled from '@emotion/styled'
import Row from '@/components/row'

// 引入為組件的形式
import { ReactComponent as Logo } from '@/assets/images/software-logo.svg'

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1.6rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`

export const NavBar = styled(Row)`
  display: flex;
`

export const NavItem = styled.h3<{
  type?: 'primary'
}>`
  color: ${(props) => props.type === 'primary' && 'var(--color-primary)'};
`
export const NavLogo = styled(Logo)`
  width: 18rem;
  color: rgb(38, 132, 255);
  cursor: pointer;
`

export const UserBar = styled(Row)``
