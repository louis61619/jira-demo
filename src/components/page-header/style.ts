import styled from '@emotion/styled'
import { Row } from '@/components/lib'

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1.6rem 2.4rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);

  .ant-btn {
    margin-right: 0;
  }
`

export const NavBar = styled(Row)`
  display: flex;
`

export const NavItem = styled.h3<{
  type?: 'primary'
  mobileHidden?: boolean
}>`
  color: ${(props) => props.type === 'primary' && 'var(--color-primary)'};

  @media (max-width: 525px) {
    display: ${(props) => props.mobileHidden && 'none'};
  }
`
export const LogoWrapper = styled.div`
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
    width: 16rem;
    color: rgb(38, 132, 255);
    cursor: pointer;
  }

  @media (max-width: 525px) {
    width: 2.5rem;
    overflow-y: hidden;
  }
`

export const UserBar = styled(Row)``

export const PopoverWrapper = styled.div`
  min-width: 30rem;

  @media (max-width: 525px) {
    min-width: 28rem;
  }
`
