import { useUrlQueryParam } from '@/hooks'
import { useProject } from '@/service/projects'
import { useMemo } from 'react'
import { useLocation } from 'react-router'

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()

  const id = pathname.match(/project\/(\d+)/)?.[1]
  return Number(id)
}

export const useProjectInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useKanbanQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTasksSearchParmas = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId'])
  const projectId = useProjectIdInUrl()

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

export const useTasksQueryKey = () => ['tasks', useTasksSearchParmas()]
