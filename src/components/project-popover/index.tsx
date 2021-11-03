import React from 'react'
import { Popover, Typography, List } from 'antd'
import { useDispatch } from 'react-redux'
import { projectListActions } from '@/store/project-list'

import { useProjects } from '@/service/projects'
import { ButtonNoPadding } from '@/components/button'
import { PopoverWrapper } from './style'

interface ProjectPopoverProps {
  setProjectModalOpen?: (isOpen: boolean) => void
}

const ProjectPopover = (props: ProjectPopoverProps) => {
  const dispatch = useDispatch()
  const { data: projects } = useProjects()
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
      <ButtonNoPadding onClick={() => dispatch(projectListActions.openProjectModel())} type="link">
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
