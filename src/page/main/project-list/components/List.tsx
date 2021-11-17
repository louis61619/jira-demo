import React from 'react'
import type { Project } from '@/types/project'

import { Table, TableColumnsType, TableProps } from 'antd'

import { Link } from 'react-router-dom'

import { User } from '@/types/user'

import { useProjectModal, useProjectQueryKey } from '@/hooks'
import { useDeleteProject } from '@/service/projects'

import { useEditProject } from '@/service/projects'
import { foramteDate } from '@/utils/fomate-time'
import Pin from '@/components/pin'
import ListDropdown from '@/components/list-dropdown'
// import ListDropdown from './ListDropdown'

interface ListProps extends TableProps<Project> {
  users: User[]
  // refresh: () => void
  // setProjectModalOpen?: (isOpen: boolean) => void
}

const List = (props: ListProps) => {
  const { users, ...otherProps } = props
  const { mutate } = useEditProject(useProjectQueryKey())

  const { startEdit } = useProjectModal()
  const editProject = (id: number) => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey())

  // const pinProject = (id: number, pin: boolean) => mutate({ id, pin })
  // point free 風格寫法
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

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
        return <Link to={project.id?.toString()}>{project.name}</Link>
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
    },
    {
      title: '操作',
      render(value, project) {
        return (
          <ListDropdown
            handleEdit={() => editProject(project.id)}
            handleDelete={() => deleteProject({ id: project.id })}
          />
        )
      },
      width: 80
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
