import styled from '@emotion/styled'
import { DropChild } from '@/components/drag-and-drop'

export const ColumnsWrapper = styled(DropChild)`
  display: inline-flex;
  flex: 1;
  overflow: auto;
`

export const KanbanWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
