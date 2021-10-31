import React, { useState } from 'react'
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

  const [projectModalOpen, setProjectModalOpen] = useState(false)

  return (
    <MainWrapper>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      <ContentWrapper>
        {/* <ProjectList /> */}
        {/* <Route */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/project" />} />
            <Route
              path="/project"
              element={<ProjectList setProjectModalOpen={setProjectModalOpen} />}
            />
            <Route path="/project/:id/*" element={<Project />} />
          </Routes>
        </BrowserRouter>
      </ContentWrapper>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </MainWrapper>
  )
}

export default Main
