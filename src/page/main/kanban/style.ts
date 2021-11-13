import styled from '@emotion/styled'

export const ColumnsWrapper = styled.div`
  display: flex;
  overflow: hidden;
`

export const KanbanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .column {
    flex: 1;
    overflow-x: auto;
  }
`
