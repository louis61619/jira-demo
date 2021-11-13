import React from 'react'
import { Form, Input, Button } from 'antd'
import UserSelect from '@/components/user-select'
import SearchForm from '@/components/search-form'
import TaskTypeSelect from '@/components/task-type-select'
import { useTasksSearchParmas } from '../hooks/useKanbanSearchParams'

interface Props {}

const SearchPanel = (props: Props) => {
  const [param, setParam] = useTasksSearchParmas()

  const reset = () => {
    setParam({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined
    })
  }

  return (
    <SearchForm layout="inline">
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          placeholder="請輸入任務名..."
          onChange={(e) => {
            setParam({
              name: e.target.value
            })
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="負責人"
          value={param.processorId}
          onChange={(value) =>
            setParam({
              processorId: value
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <TaskTypeSelect
          defaultOptionName="類型"
          value={param.typeId}
          onChange={(value) =>
            setParam({
              typeId: value
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button onClick={reset}>清除篩選器</Button>
      </Form.Item>
    </SearchForm>
  )
}

export default SearchPanel
