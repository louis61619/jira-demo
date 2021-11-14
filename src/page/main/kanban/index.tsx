import React from 'react'
import { Divider, Spin } from 'antd'
import styled from '@emotion/styled'
import { DragDropContext, DropResult, Droppable, Draggable } from 'react-beautiful-dnd'

import { useKanbans } from '@/service/kanban'
import { useTasks } from '@/service/task'
import { useDocumentTitle } from '@/hooks'
import { Drag, Drop, DropChild } from '@/components/drag-and-drop'

import { useProjectInUrl, useKanbanSearchParams, useTasksSearchParmas } from './hooks/useKanbans'
import KanbanColumn from './components/Column'
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

  const onDragEnd = () => {
    console.log('--')
  }

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
            {/* <Drop type={'COLUMN'} direction="horizontal" droppableId="kanban">
              <DropChild style={{ display: 'flex' }}>
                {kanbans?.map((kanban, index) => {
                  return (
                    <Drag key={kanban.id} draggableId={'kaban' + kanban.id} index={index}>
                      <div>
                        <KanbanColumn kanban={kanban} />
                      </div>
                    </Drag>
                  )
                })}
              </DropChild>
            </Drop> */}
            <Droppable droppableId="board" type="COLUMN" direction="horizontal">
              {(provided) => (
                <div
                  style={{ display: 'flex' }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {kanbans?.map((kanban, index) => (
                    <KanbanColumn key={kanban.id} kanban={kanban} index={index} />
                    // <Draggable key={kanban.id} draggableId={'kaban' + kanban.id} index={index}>
                    //   {(provided) => (
                    //     <KanbanColumn
                    //       ref={provided.innerRef}
                    //       {...provided.draggableProps}
                    //       kanban={kanban}
                    //     >
                    //       <div className="title" {...provided.dragHandleProps}>
                    //         <h3>{kanban.name}</h3>
                    //         {/* <KanbanColumnMenu kanban={kanban} /> */}
                    //       </div>
                    //     </KanbanColumn>
                    //   )}
                    // </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <CreateKanban />
        </ColumnsWrapper>
      )}
      <TaskModal />
    </KanbanWrapper>
  )
}

export default Kanban
