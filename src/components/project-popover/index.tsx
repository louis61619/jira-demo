import React from 'react'

import { Popover, Typography, List } from 'antd'
import { useProjects } from '@/service/projects'
import { ButtonNoPadding } from '@/components/button'
import { PopoverWrapper } from './style'

interface ProjectPopoverProps {
  setProjectModalOpen?: (isOpen: boolean) => void
}

const ProjectPopover = (props: ProjectPopoverProps) => {
  const { data: projects, isLoading } = useProjects()
  const pinnedProjects = projects?.filter((project) => project.pin)

  const content = (
    <PopoverWrapper>
      <Typography.Text type="secondary">收藏項目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <ButtonNoPadding onClick={() => props.setProjectModalOpen?.(true)} type="link">
        創建項目
      </ButtonNoPadding>
    </PopoverWrapper>
  )

  return (
    <Popover placement="bottom" content={content}>
      <h3>項目</h3>
    </Popover>
  )
}

export default ProjectPopover