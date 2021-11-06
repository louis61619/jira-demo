import React from 'react'
import IdSelect from '@/components/id-select'
import { useUsers } from '@/service/users'

interface UserSelectProps extends React.ComponentProps<typeof IdSelect> {
  // users: User[]
}

const UserSelect = (props: UserSelectProps) => {
  const { ...resetProps } = props

  const { data: users } = useUsers()

  return <IdSelect options={users || []} {...resetProps}></IdSelect>
}

export default UserSelect
