import React from 'react'

import { Table, TableColumnsType, TableProps } from 'antd'
import { Link } from 'react-router-dom'

import type { User } from '@/types'

import { useEditProject } from '@/service/projects'
import { foramteDate } from '@/utils/fomate-time'
import Pin from '@/components/pin'

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
  refresh: () => void
}

const List = (props: ListProps) => {
  const { users, refresh, ...otherProps } = props
  const { mutate } = useEditProject()

  // const pinProject = (id: number, pin: boolean) => mutate({ id, pin })

  // point free 風格寫法
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(() => refresh())

  const columns: TableColumnsType<Project> = [
    {
      title: <Pin checked={true} disabled={true} />,
      render(value, project) {
        return <Pin checked={project.pin} onCheckChange={pinProject(project.id)} />
      },
      width: 50
    },
    {
      title: '名稱',
      // dataIndex: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
      render(value, project) {
        return <Link to={project.id.toString()}>{project.name}</Link>
      },
      width: 180
    },
    {
      title: '負責人',
      render(value, project) {
        return (
          <span key={project.id}>
            {users.find((user) => user.id === project.personId)?.name || '未知'}
          </span>
        )
      },
      width: 100
    },
    {
      title: '創建時間',
      render(value, project) {
        return <span key={project.id}>{project.created ? foramteDate(project.created) : '無'}</span>
      },
      width: 200
    }
  ]

  // table中的類型為從datasource自動推導
  return (
    <Table
      scroll={{ x: '100%' }}
      pagination={false}
      rowKey="id"
      columns={columns}
      tableLayout="fixed"
      {...otherProps}
    />
  )

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
