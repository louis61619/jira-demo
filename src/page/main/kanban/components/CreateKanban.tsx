import React, { useState } from 'react'
import { Input } from 'antd'
import { useAddKanban } from '@/service/kanban'

import { useKanbanQueryKey, useProjectIdInUrl } from '../hooks/useKanbans'

import { KanbanColumnWrapper } from './style'

interface Props {}

const CreateKanban = (props: Props) => {
  const [name, setName] = useState('')
  const projectId = useProjectIdInUrl()
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey())

  const submit = async () => {
    await addKanban({ name, projectId })
    setName('')
  }

  return (
    <KanbanColumnWrapper>
      <Input
        size="large"
        placeholder="新建看板名稱"
        onPressEnter={submit}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </KanbanColumnWrapper>
  )
}

export default CreateKanban
