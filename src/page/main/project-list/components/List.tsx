import React from 'react'

import { Table, TableColumnsType, TableProps } from 'antd'
import { Link } from 'react-router-dom'
import type { User } from '@/types'

import { foramteDate } from '@/utils/fomate-time'

export type Project = {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: string
}

interface ListProps extends TableProps<Project> {
  users: User[]
}

const List = (props: ListProps) => {
  const { users, ...otherProps } = props

  const columns: TableColumnsType<Project> = [
    {
      title: '名稱',
      // dataIndex: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render(value, project) {
        return <Link to={project.id.toString()}>{project.name}</Link>
      }
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
    },
    {
      title: '創建時間',
      render(value, project) {
        return <span key={project.id}>{project.created ? foramteDate(project.created) : '無'}</span>
      }
    }
  ]

  // table中的類型為從datasource自動推導
  return <Table pagination={false} rowKey="id" columns={columns} {...otherProps} />

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
