import React from 'react'
import type { User } from '@/types'

interface ListProps {
  list: {
    id: number
    name: string
    personId: number
    pin: boolean
    organization: string
  }[]
  users: User[]
}

const List = (props: ListProps) => {
  const { list, users } = props
  return (
    <table>
      <thead>
        <tr>
          <th>名稱</th>
          <th>負責人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => {
          return (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{users.find((user) => user.id === project.personId)?.name}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default List
