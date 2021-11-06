import { useUrlQueryParam } from '@/hooks'
import { useProject } from '@/service/projects'

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])

  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))
  const startEdit = (id: number) => {
    // open()
    setEditingProjectId({ editingProjectId: id })
  }

  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => {
    setEditingProjectId({ editingProjectId: undefined })
    setProjectCreate({ projectCreate: undefined })
  }

  // 返回的參數在兩到三個以內就用tupple
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}
