import { useEffect, useCallback } from 'react'
import { useAsync, useReuqest } from '@/hooks'

import { Project } from '@/page/main/project-list/components/List'
import { SearchPanelProps } from '@/page/main/project-list/components/SearchPanel'

import { cleanObject } from '@/utils/clean-object'

export function useProjects(param: SearchPanelProps['param']) {
  const client = useReuqest()
  const { run, ...result } = useAsync<Project[]>()

  const fetchProjects = useCallback(
    () => client('projects', { data: cleanObject(param || {}) }),
    [client, param]
  )

  useEffect(() => {
    run(fetchProjects(), { retry: fetchProjects })
  }, [param, client, fetchProjects, run])

  return result
}

export function useEditProject() {
  const client = useReuqest()
  const { run, ...result } = useAsync()

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      })
    )
  }

  return {
    mutate,
    ...result
  }
}

export function useAddProject() {
  const client = useReuqest()
  const { run, ...result } = useAsync()

  const mutate = (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'POST'
      })
    )
  }

  return {
    mutate,
    ...result
  }
}
