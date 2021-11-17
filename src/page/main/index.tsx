import React from 'react'
import { Route, Routes, Navigate, useLocation } from 'react-router'

import { useDocumentTitle } from '@/hooks'
import PageHeader from '@/components/page-header'
import ProjectModal from '@/components/project-modal'

import ProjectList from './project-list'
import Project from './project'

import { MainWrapper, ContentWrapper } from './style'

interface MainProps {}

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

const Main = (props: MainProps) => {
  useDocumentTitle('項目列表', false)

  const routeType = useRouteType()
  console.log(routeType)

  return (
    <MainWrapper>
      <PageHeader />
      <ContentWrapper routeType={routeType}>
        {/* <ProjectList /> */}
        {/* <Route */}

        <Routes>
          <Route path="/" element={<Navigate to="/project" replace={true} />} />
          <Route path="/project" element={<ProjectList />} />
          <Route path="/project/:id/*" element={<Project />} />
        </Routes>
      </ContentWrapper>
      <ProjectModal />
    </MainWrapper>
  )
}

export default Main
