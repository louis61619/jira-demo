import React from 'react'

import { Button, Dropdown, Menu, Modal } from 'antd'
import { DashOutlined } from '@ant-design/icons'
import { Kanban } from '@/types/kanban'
import { useDeleteKanben } from '@/service/kanban'
import { useKanbanQueryKey } from '../hooks/useKanbans'

interface Props {
  kanban: Kanban
}

const KanbanColumnMenu = ({ kanban }: Props) => {
  const { mutate } = useDeleteKanben(useKanbanQueryKey())

  const startRemove = () => {
    Modal.confirm({
      okText: '確定',
      cancelText: '取消',
      title: '確定要刪除看版嗎？',
      onOk() {
        mutate({ id: kanban.id })
      }
    })
  }

  const overlay = (
    <Menu>
      <Menu.Item key="remove" onClick={startRemove}>
        <Button type="link">刪除</Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={overlay} placement="bottomRight" arrow>
      <DashOutlined />
    </Dropdown>
  )
}

export default KanbanColumnMenu
