import React from 'react'
import { Input, Select } from 'antd'
import type { User } from '@/types'

interface SearchPanelProps {
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
    <div>
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
    </div>
  )
}

export default SearchPanel
