import React from 'react'
import { Button, Dropdown, Menu, Modal } from 'antd'
import { DashOutlined } from '@ant-design/icons'
// import { useProjectModal, useProjectQueryKey } from '@/hooks'
// import { useDeleteProject } from '@/service/projects'

interface Props {
  // project: Project
  handleEdit: () => void
  handleDelete: () => void
}

const ListDropdown = ({ handleEdit, handleDelete }: Props) => {
  // const { startEdit } = useProjectModal()
  // const editProject = (id: number) => startEdit(id)
  // const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey())
  const confirmDeleteProject = () => {
    Modal.confirm({
      title: '確定刪除這個項目嗎？',
      content: '點擊確定刪除',
      okText: '確定',
      onOk() {
        handleDelete()
        // deleteProject({ id })
      }
    })
  }

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="edit" onClick={() => handleEdit()}>
            <Button type="link">編輯</Button>
          </Menu.Item>
          <Menu.Item key="remove" onClick={() => confirmDeleteProject()}>
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
