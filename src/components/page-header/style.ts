import styled from '@emotion/styled'
import Row from '@/components/row'

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
  mobileHidden?: boolean
}>`
  color: ${(props) => props.type === 'primary' && 'var(--color-primary)'};

  @media (max-width: 525px) {
    display: ${(props) => props.mobileHidden && 'none'};
  }
`
export const NavLogo = styled.div`
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
