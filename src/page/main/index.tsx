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

  return (
    <MainWrapper>
      <BrowserRouter>
        <PageHeader />
        <ContentWrapper>
          {/* <ProjectList /> */}
          {/* <Route */}

          <Routes>
            <Route path="/" element={<Navigate to="/project" replace={true} />} />
            <Route path="/project" element={<ProjectList />} />
            <Route path="/project/:id/*" element={<Project />} />
          </Routes>
        </ContentWrapper>
        <ProjectModal />
      </BrowserRouter>
    </MainWrapper>
  )
}

export default Main
