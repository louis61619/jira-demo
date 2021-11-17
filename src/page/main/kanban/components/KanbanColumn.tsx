import React, { forwardRef } from 'react'

import { Drag, Drop } from '@/components/drag-and-drop'
import { Kanban } from '@/types/kanban'
import { useTasks } from '@/service/task'

import { useTasksSearchParmas } from '../hooks/useKanbans'
import { useTaskModal } from '../hooks/useTaskModal'
import { useDropProps, DragProps } from '../hooks/useDropProps'
import CreateTask from './CreateTask'
import TaskCard from './TaskCard'
import KanbanColumnMenu from './KanbanColumnMenu'
import { KanbanColumnWrapper, TasksWrapper, DropContainer } from './style'

interface Props {
  kanban: Kanban
}

const KanbanColum = forwardRef<HTMLDivElement, Props>(({ kanban, children, ...props }, ref) => {
  const [param] = useTasksSearchParmas()
  const { data: allTasks } = useTasks(param)
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)
  const { startEdit } = useTaskModal()

  const dragProps = useDropProps(props as DragProps)

  return (
    <div ref={ref} {...dragProps.draggableProps}>
      <KanbanColumnWrapper>
        <div className="title" {...dragProps.dragHandleProps}>
          <h3>{kanban.name}</h3>
          <KanbanColumnMenu kanban={kanban} />
        </div>
        <CreateTask kanbanId={kanban.id} />
        <Drop type="ROW" direction="vertical" droppableId={kanban.id.toString()}>
          <DropContainer>
            <TasksWrapper>
              {tasks?.map((task, index) => (
                <Drag key={task.id} index={index} draggableId={'task' + task.id}>
                  <TaskCard startEdit={startEdit} task={task} />
                </Drag>
              ))}
            </TasksWrapper>
          </DropContainer>
        </Drop>
      </KanbanColumnWrapper>
    </div>
  )
})

export default KanbanColum
