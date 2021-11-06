import React from 'react'
import { Input, Form } from 'antd'

import type { User } from '@/types'

import UserSelect from '@/components/user-select'

import { Project } from './List'
import { FormWrapper } from './style'

export interface SearchPanelProps {
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelProps['param']) => void
  users: User[]
}

const SearchPanel = (props: SearchPanelProps) => {
  const { param, setParam, users } = props

  return (
    <FormWrapper
      labelAlign="left"
      wrapperCol={{ md: 10, sm: 20 }}
      labelCol={{ sm: 3, md: 3, lg: 2 }}
    >
      <Form.Item label="查找名稱">
        <Input
          type="text"
          value={param.name}
          onChange={(e) => {
            setParam({
              ...param,
              name: e.target.value
            })
          }}
        />
      </Form.Item>
      <Form.Item label="負責人">
        <UserSelect
          defaultOptionName="負責人"
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value
            })
          }
        ></UserSelect>
      </Form.Item>
    </FormWrapper>
  )
}

export default SearchPanel
