import React from 'react'
import { Drawer } from 'antd'

interface ProjectModalProps {
  projectModalOpen: boolean
  onClose: () => void
}

const ProjectModel = ({ projectModalOpen, onClose }: ProjectModalProps) => {
  return <Drawer visible={projectModalOpen} onClose={onClose} width="100%"></Drawer>
}

export default ProjectModel
