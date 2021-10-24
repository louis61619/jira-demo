import React from 'react'
import { Link } from 'react-router-dom'
import { Route, Routes, Navigate } from 'react-router'
import Board from '../board'
import Epic from '../epic'

interface Props {}

const Project = (props: Props) => {
  return (
    <div>
      Project
      <Link to="board">看板</Link>
      <Link to="epic">任務組</Link>
      <Routes>
        <Route path="/" element={<Navigate to="board" />} />
        <Route path="/board" element={<Board />} />
        <Route path="/epic" element={<Epic />} />
      </Routes>
    </div>
  )
}

export default Project
