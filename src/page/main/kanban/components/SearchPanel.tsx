import React, { useEffect, useState } from 'react'
import { Form, Input, Button } from 'antd'
import UserSelect from '@/components/user-select'
import SearchForm from '@/components/search-form'
import TaskTypeSelect from '@/components/task-type-select'
import { useTasksSearchParmas } from '../hooks/useKanbans'
import { useDebounce } from '@/hooks'

interface Props {}

const SearchPanel = (props: Props) => {
  const [param, setParam] = useTasksSearchParmas()
  const [form] = Form.useForm()
  const [name, setName] = useState(param.name || '')
  const debounceName = useDebounce(name, 300)

  const reset = () => {
    setParam({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined
    })
  }

  useEffect(() => {
    setParam({
      name: debounceName
    })
  }, [debounceName, setParam])

  return (
    <SearchForm layout="inline" form={form}>
      <Form.Item>
        <Input
          type="text"
          value={name}
          placeholder="請輸入任務名..."
          onChange={(e) => setName(e.target.value)}
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
