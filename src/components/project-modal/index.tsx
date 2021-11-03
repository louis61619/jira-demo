import React from 'react'
import { Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { projectListActions, selectProjectModalOpen } from '@/store/project-list'

// interface ProjectModalProps {
//   projectModalOpen: boolean
//   onClose: () => void
// }

const ProjectModel = () => {
  const dispatch = useDispatch()
  const projectModalOpen = useSelector(selectProjectModalOpen)

  return (
    <Drawer
      visible={projectModalOpen}
      onClose={() => dispatch(projectListActions.closeProjectModel())}
      width="100%"
    ></Drawer>
  )
}

export default ProjectModel
