import styled from '@emotion/styled'
import { Button, Card } from 'antd'

export const Container = styled.div`
  display: flex;
  justify-content: center;
`

export const CardWrapper = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
  margin-top: 6rem;

  @media (max-height: 600px) {
    margin-top: 0rem;
    height: 100vh;
  }
`

export const Logo = styled.div`
  background: url(${require('@/assets/images/logo.svg').default}) no-repeat center;
  padding: 4rem 0;
  background-size: 8rem;
  width: 100%;
`

export const LongButton = styled(Button)`
  width: 100%;
`
