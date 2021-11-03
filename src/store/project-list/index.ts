import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/store'

interface State {
  projectModalOpen: boolean
}

const initialState: State = {
  projectModalOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectList',
  initialState,
  reducers: {
    openProjectModel(state) {
      state.projectModalOpen = true
    },
    closeProjectModel(state) {
      state.projectModalOpen = false
    }
  }
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen
