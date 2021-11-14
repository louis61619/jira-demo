import styled from '@emotion/styled'
import { Button } from 'antd'

interface RowProps {
  gap?: number
  between?: boolean
  width?: string
}

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`

export const Row = styled.div<RowProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? 'space-between' : undefined)};
  width: ${(props) => props.width};
  > * {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: ${(props) => (props.gap ? props.gap + 'rem' : '2rem')};
  }
`
