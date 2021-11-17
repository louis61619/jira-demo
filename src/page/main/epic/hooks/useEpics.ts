import { useLocation } from 'react-router'
import { useProject } from '@/service/projects'

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()

  const id = pathname.match(/project\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useEpicSearchParams = () => {
  return [
    {
      projectId: useProjectIdInUrl()
    }
  ]
}

export const useEpicsQueryKey = () => {
  const [param] = useEpicSearchParams()

  return ['epics', param]
}
