import React from 'react'
import { Input, Form } from 'antd'

import { User } from '@/types/user'

import UserSelect from '@/components/user-select'
import SearchForm from '@/components/search-form'

import { Project } from '@/types/project'

export interface SearchPanelProps {
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
  users: User[]
}

const SearchPanel = (props: SearchPanelProps) => {
  const { param, setParam, users } = props

  return (
    <SearchForm layout="inline">
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          placeholder="查找名稱"
          onChange={(e) => {
            setParam({
              ...param,
              name: e.target.value
            })
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="負責人"
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value
            })
          }
        />
      </Form.Item>
    </SearchForm>
  )
}

export default SearchPanel
