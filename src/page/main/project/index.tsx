import React from 'react'
import { Link } from 'react-router-dom'
import { Route, Routes, Navigate, useLocation } from 'react-router'
import { Menu, Grid } from 'antd'

import Kanban from '../kanban'
import Epic from '../epic'
import { ProjectWrapper } from './style'

interface Props {}

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

const Project = (props: Props) => {
  const routeType = useRouteType()
  const { useBreakpoint } = Grid

  const { md } = useBreakpoint()

  // console.log(screens)

  return (
    <ProjectWrapper routeType={routeType}>
      {/* <aside className="aside"> */}
      <Menu mode={md ? 'inline' : 'horizontal'} selectedKeys={[routeType]}>
        <Menu.Item key="kanban">
          <Link to="kanban">看板</Link>
        </Menu.Item>
        <Menu.Item key="epic">
          <Link to="epic">任務組</Link>
        </Menu.Item>
      </Menu>
      {/* </aside> */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="kanban" replace />} />
          <Route path="/kanban" element={<Kanban />} />
          <Route path="/epic" element={<Epic />} />
        </Routes>
      </div>
    </ProjectWrapper>
  )
}

export default Project
