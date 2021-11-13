import React from 'react'
import { Button, Dropdown, Menu, Modal } from 'antd'
import { DashOutlined } from '@ant-design/icons'
import { useProjectModal, useProjectQueryKey } from '@/hooks'
import { Project } from '@/types/project'
import { useDeleteProject } from '@/service/projects'

interface Props {
  project: Project
}

const ListDropdown = ({ project }: Props) => {
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey())
  const confirmDeleteProject = (id: number) => {
    console.log(id)
    Modal.confirm({
      title: '確定刪除這個項目嗎？',
      content: '點擊確定刪除',
      okText: '確定',
      onOk() {
        deleteProject({ id })
      }
    })
  }

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="edit" onClick={() => editProject(project.id)}>
            <Button type="link">編輯</Button>
          </Menu.Item>
          <Menu.Item key="remove" onClick={() => confirmDeleteProject(project.id)}>
            <Button type="link">刪除</Button>
          </Menu.Item>
        </Menu>
      }
    >
      <DashOutlined />
    </Dropdown>
  )
}

export default ListDropdown
