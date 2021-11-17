import { useMemo } from 'react'

import { useUrlQueryParam } from '@/hooks'
import { useProject } from '@/service/projects'

import { useLocation } from 'react-router'

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()

  const id = pathname.match(/project\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

// export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useKanbanSearchParams = () => {
  return [
    {
      projectId: useProjectIdInUrl()
    }
  ]
}

export const useKanbanQueryKey = () => {
  const [param] = useKanbanSearchParams()
  return ['kanbans', param]
}

export const useTasksSearchParmas = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId'])
  const projectId = useProjectIdInUrl()
  // const debounceName = useDebounce(param.name, 200)

  return [
    useMemo(
      () => ({
        projectId,
        typeId: Number(param.typeId) || undefined,
        processorId: Number(param.processorId) || undefined,
        tagId: Number(param.tagId) || undefined,
        name: param.name
      }),
      [projectId, param]
    ),
    setParam
  ] as const
}

export const useTasksQueryKey = () => {
  const [param] = useTasksSearchParmas()
  return ['tasks', param]
}
