import React, { forwardRef } from 'react'
import { Button, Modal } from 'antd'

import { Task } from '@/types/task'

import { useDeleteTask } from '@/service/task'
import { useTaskType } from '@/service/task-type'

import bugIcon from '@/assets/images/bug.svg'
import taskIcon from '@/assets/images/task.svg'

import Mark from '@/components/mark'

import { useTasksQueryKey, useTasksSearchParmas } from '../hooks/useKanbans'
import { TaskCardWrapper } from './style'

interface TaskCardProps {
  task: Task
  startEdit: (id: number) => void
}

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskType()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name

  if (!name) return null

  return <img src={name === 'task' ? taskIcon : bugIcon} alt="icon" />
}

const TaskCard = forwardRef<any, TaskCardProps>(({ task, startEdit, ...props }, ref) => {
  const [param] = useTasksSearchParmas()
  const { mutate } = useDeleteTask(useTasksQueryKey())
  const { name: keyword } = param

  const startRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    Modal.confirm({
      okText: '確定',
      cancelText: '取消',
      title: '確定要刪除任務嗎？',
      onOk() {
        mutate({ id: task.id })
      }
    })
  }

  return (
    <TaskCardWrapper {...props} ref={ref} key={task.id} onClick={() => startEdit(task.id)}>
      <p>
        <Mark keyword={keyword} name={task.name} />
      </p>
      <div className="bottom">
        <TaskTypeIcon id={task.typeId} />
        <Button onClick={startRemove} size="small" type="primary">
          刪除
        </Button>
      </div>
    </TaskCardWrapper>
  )
})

export default TaskCard
