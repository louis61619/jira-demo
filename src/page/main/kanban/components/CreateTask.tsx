import React, { useEffect, useState } from 'react'
import { useAddTask } from '@/service/task'
import { useProjectIdInUrl, useTasksQueryKey } from '../hooks/useKanbans'
import { Card, Input } from 'antd'

interface Props {
  kanbanId: number
}

const CreateTask = ({ kanbanId }: Props) => {
  const [name, setName] = useState('')
  const [inputMode, setInputMode] = useState(false)

  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey())
  const projectId = useProjectIdInUrl()

  const submit = async () => {
    await addTask({ projectId, name, kanbanId })
    setInputMode(false)
    setName('')
  }

  const toggle = () => setInputMode((mode) => !mode)

  useEffect(() => {
    if (!inputMode) setName('')
  }, [inputMode])

  if (!inputMode) {
    return (
      <div style={{ padding: '0.6rem', cursor: 'pointer' }} onClick={toggle}>
        + 創建任務
      </div>
    )
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder="需要做些什麼"
        autoFocus={true}
        value={name}
        onPressEnter={submit}
        onChange={(e) => setName(e.target.value)}
      />
    </Card>
  )
}

export default CreateTask
