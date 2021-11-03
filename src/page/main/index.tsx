import React from 'react'
import { Route, Routes, Navigate } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import { useDocumentTitle } from '@/hooks'
import PageHeader from '@/components/page-header'
import ProjectModal from '@/components/project-modal'

import ProjectList from './project-list'
import Project from './project'

import { MainWrapper, ContentWrapper } from './style'

interface MainProps {}

const Main = (props: MainProps) => {
  useDocumentTitle('項目列表', false)

  return (
    <MainWrapper>
      <PageHeader />
      <ContentWrapper>
        {/* <ProjectList /> */}
        {/* <Route */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/project" />} />
            <Route path="/project" element={<ProjectList />} />
            <Route path="/project/:id/*" element={<Project />} />
          </Routes>
        </BrowserRouter>
      </ContentWrapper>
      <ProjectModal />
    </MainWrapper>
  )
}

export default Main
