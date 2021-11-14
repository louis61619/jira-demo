import { DropChild } from '@/components/drag-and-drop'
import styled from '@emotion/styled'
import { Card } from 'antd'

export const KanbanColumnWrapper = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0.8rem 1rem;
  margin-right: 1.5rem;
  overflow: hidden;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 6px;
  }
`

export const TasksWrapper = styled.div`
  /* overflow-y: scroll; */
  /* height: 600px; */
  min-height: 500px;
  :last-child {
    margin-right: 0;
  }
`

export const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  /* flex: 1; */
  max-height: 500px;

  /* ::-webkit-scrollbar {
    width: 0;
  } */
`
export const DropContainer = styled(DropChild)`
  display: flex;
  flex-direction: column;
  /* height: 100%; */
`

export const TaskCardWrapper = styled(Card)`
  margin-bottom: 0.5rem;
  cursor: pointer;

  .bottom {
    display: flex;
    justify-content: space-between;
  }
`
