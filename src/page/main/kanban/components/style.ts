import { DropChild } from '@/components/drag-and-drop'
import styled from '@emotion/styled'

export const KanbanColumnWrapper = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.8rem 0.8rem 1rem;
  margin-right: 1.5rem;
  /* min-height: 100%; */
  min-height: 18rem;

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
  /* min-height: 300px; */
  :last-child {
    margin-right: 0;
  }
`

export const DropContainer = styled(DropChild)`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* min-height: 10rem; */
`

export const TaskCardWrapper = styled.div`
  margin-bottom: 0.5rem;
  cursor: pointer;
  background-color: #fff;
  padding: 1.6rem 1rem;
  /* min-height: 10rem; */

  .bottom {
    display: flex;
    justify-content: space-between;
  }
`
