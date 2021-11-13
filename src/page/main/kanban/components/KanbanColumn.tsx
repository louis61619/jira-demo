import React from 'react'
import { Kanban } from '@/types/kanban'
import { useTasks } from '@/service/task'
import { useTaskType } from '@/service/task-type'
import bugIcon from '@/assets/images/bug.svg'
import taskIcon from '@/assets/images/task.svg'
import { useTasksSearchParmas } from '../hooks/useKanbanSearchParams'
import { KanbanColumnWrapper, KanbanCard } from './style'

interface Props {
  kanban: Kanban
}

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskType()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name

  if (!name) return null

  return <img src={name === 'task' ? taskIcon : bugIcon} alt="icon" />
}

const KanbanColum: React.FC<Props> = ({ kanban }) => {
  const [param] = useTasksSearchParmas()
  const { data: allTasks } = useTasks(param)
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)
  return (
    <KanbanColumnWrapper>
      <h3>{kanban.name}</h3>
      {tasks?.map((task) => (
        <KanbanCard key={task.id}>
          <div>{task.name}</div>
          <TaskTypeIcon id={task.typeId} />
        </KanbanCard>
      ))}
    </KanbanColumnWrapper>
  )
}

export default KanbanColum
