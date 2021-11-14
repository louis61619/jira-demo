import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Kanban } from '@/types/kanban'
import { useTasks } from '@/service/task'

import { useTasksSearchParmas } from '../hooks/useKanbans'
import KanbanColumnMenu from './KanbanColumnMenu'
import TaskList from './TaskList'
import { KanbanColumnWrapper } from './style'

interface Props {
  kanban: Kanban
  index: number
}

const KanbanColum = ({ kanban, index }: Props) => {
  const [param] = useTasksSearchParmas()
  const { data: allTasks } = useTasks(param)
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)

  return (
    <Draggable draggableId={'kanban' + kanban.id} index={index}>
      {(provided) => (
        <KanbanColumnWrapper ref={provided.innerRef} {...provided.draggableProps}>
          <div className="title" {...provided.dragHandleProps}>
            <h3>{kanban.name}</h3>
            <KanbanColumnMenu kanban={kanban} />
          </div>
          <TaskList tasks={tasks || []} kanban={kanban} />
        </KanbanColumnWrapper>
      )}
    </Draggable>
  )
}

export default KanbanColum
