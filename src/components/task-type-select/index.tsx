import React from 'react'
import IdSelect from '@/components/id-select'
import { useTaskType } from '@/service/task-type'

interface TaskTypeSelectProps extends React.ComponentProps<typeof IdSelect> {
  // users: User[]
}

const UserSelect = (props: TaskTypeSelectProps) => {
  const { ...resetProps } = props

  const { data: taskTypes } = useTaskType()

  return <IdSelect options={taskTypes || []} {...resetProps}></IdSelect>
}

export default UserSelect
