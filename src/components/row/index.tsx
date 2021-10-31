import styled from '@emotion/styled'

interface RowProps {
  gap?: number
  between?: boolean
  width?: string
}

const Row = styled.div<RowProps>`
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

export default Row
