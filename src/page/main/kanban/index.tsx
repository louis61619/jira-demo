import React from 'react'
import { Divider, Spin } from 'antd'
import { DragDropContext } from 'react-beautiful-dnd'

import { useKanbans } from '@/service/kanban'
import { useTasks } from '@/service/task'
import { useDocumentTitle } from '@/hooks'
import { Drag, Drop, DropChild } from '@/components/drag-and-drop'

import { useProjectInUrl, useKanbanSearchParams, useTasksSearchParmas } from './hooks/useKanbans'
import { useDragEnd } from './hooks/useDragEnd'

import KanbanColumn from './components/KanbanColumn'
import SearchPanel from './components/SearchPanel'
import CreateKanban from './components/CreateKanban'
import { ColumnsWrapper, KanbanWrapper } from './style'
import TaskModal from './components/TaskModal'

interface Props {}

const Kanban = (props: Props) => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const [kanbanParams] = useKanbanSearchParams()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(kanbanParams)
  const [taskParam] = useTasksSearchParmas()
  const { isLoading: taskIsLoading } = useTasks(taskParam)
  const isLoading = taskIsLoading || kanbanIsLoading

  const onDragEnd = useDragEnd()

  return (
    <KanbanWrapper>
      <h2>{currentProject?.name}看板</h2>
      <SearchPanel />
      <Divider />

      {isLoading ? (
        <Spin style={{ margin: '3rem 0' }} />
      ) : (
        <ColumnsWrapper>
          <DragDropContext onDragEnd={onDragEnd}>
            <Drop type={'COLUMN'} direction="horizontal" droppableId="kanban">
              <DropChild style={{ display: 'flex' }}>
                {kanbans?.map((kanban, index) => {
                  return (
                    <Drag key={kanban.id} draggableId={'kaban' + kanban.id} index={index}>
                      {/* <div> */}
                      <KanbanColumn kanban={kanban} />
                      {/* </div> */}
                    </Drag>
                  )
                })}
              </DropChild>
            </Drop>
          </DragDropContext>
          <div>
            <CreateKanban />
          </div>
        </ColumnsWrapper>
      )}
      <TaskModal />
    </KanbanWrapper>
  )
}

export default Kanban
