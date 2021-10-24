import React from 'react'
import { Input, Select, Form } from 'antd'

import type { User } from '@/types'
import { FormWrapper } from './style'

export interface SearchPanelProps {
  param: {
    name: string
    personId: string
  }

  setParam: (param: SearchPanelProps['param']) => void
  users: User[]
}

const SearchPanel = (props: SearchPanelProps) => {
  const { param, setParam, users } = props

  return (
    <FormWrapper layout="inline">
      <Form.Item>
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
      <Form.Item>
        <Select
          onChange={(value) => {
            setParam({
              ...param,
              personId: value
            })
          }}
          value={param.personId}
        >
          <Select.Option value={''}>全部</Select.Option>
          {users.map((item) => {
            return (
              <Select.Option value={item.id} key={item.id}>
                {item.name}
              </Select.Option>
            )
          })}
        </Select>
      </Form.Item>
    </FormWrapper>
  )
}

export default SearchPanel
