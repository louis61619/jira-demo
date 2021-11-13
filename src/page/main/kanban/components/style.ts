import styled from '@emotion/styled'
import { Card } from 'antd'

export const KanbanColumnWrapper = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;

  :last-child {
    margin-right: 0;
  }
`

export const TaskWrapper = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`

export const KanbanCard = styled(Card)`
  margin-bottom: 0.5rem;
`
