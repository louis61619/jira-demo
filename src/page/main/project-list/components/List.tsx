import React from 'react'
import { Table, TableColumnsType } from 'antd'
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

  const columns: TableColumnsType<ListProps['list'][0]> = [
    {
      title: '名稱',
      dataIndex: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    {
      title: '負責人',
      render(value, project) {
        return (
          <span key={project.id}>
            {users.find((user) => user.id === project.personId)?.name || '未知'}
          </span>
        )
      }
    }
  ]

  // table中的類型為從datasource自動推導
  return <Table pagination={false} rowKey="id" columns={columns} dataSource={list} />

  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <th>名稱</th>
  //         <th>負責人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => {
  //         return (
  //           <tr key={project.id}>
  //             <td>{project.name}</td>
  //             <td>{users.find((user) => user.id === project.personId)?.name}</td>
  //           </tr>
  //         )
  //       })}
  //     </tbody>
  //   </table>
  // )
}

export default List
