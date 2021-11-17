import React from 'react'

import { Popover, Typography, List } from 'antd'
import { useUsers } from '@/service/users'

import { PopoverWrapper } from './style'

const UserPopover = () => {
  const { data: users } = useUsers()

  const content = (
    <PopoverWrapper>
      <Typography.Text type="secondary">組員列表</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
    </PopoverWrapper>
  )

  return (
    <Popover placement="bottom" content={content}>
      <h3>組員</h3>
    </Popover>
  )
}

export default UserPopover
