import React from 'react'
import IdSelect from '@/components/id-select'
import { User } from '@/types'

interface UserSelectProps extends React.ComponentProps<typeof IdSelect> {
  users: User[]
}

const UserSelect = (props: UserSelectProps) => {
  const { users, ...resetProps } = props
  return <IdSelect options={users || []} {...resetProps}></IdSelect>
}

export default UserSelect
