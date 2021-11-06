// import { useEffect, useCallback } from 'react'
import { useReuqest } from '@/hooks'

import { Project } from '@/page/main/project-list/components/List'
import { SearchPanelProps } from '@/page/main/project-list/components/SearchPanel'

import { cleanObject } from '@/utils/clean-object'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export function useProjects(param?: SearchPanelProps['param']) {
  const client = useReuqest()

  // const { run, ...result } = useAsync<Project[]>()

  // const fetchProjects = useCallback(
  //   () => client('projects', { data: cleanObject(param || {}) }),
  //   [client, param]
  // )

  // useEffect(() => {
  //   run(fetchProjects(), { retry: fetchProjects })
  // }, [param, client, fetchProjects, run])

  // return result

  // 使用useQuery
  return useQuery<Project[], Error>(['projects', param], () =>
    client('projects', { data: cleanObject(param || {}) })
  )
}

export function useEditProject() {
  const client = useReuqest()
  // const { run, ...result } = useAsync()

  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: 'PATCH'
  //     })
  //   )
  // }

  // return {
  //   mutate,
  //   ...result
  // }
  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}

export function useAddProject() {
  const client = useReuqest()
  // const { run, ...result } = useAsync()

  // const mutate = (params: Partial<Project>) => {
  //   run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: 'POST'
  //     })
  //   )
  // }

  // return {
  //   mutate,
  //   ...result
  // }

  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST'
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}

export const useProject = (id?: number) => {
  const client = useReuqest()
  return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), {
    enabled: !!id
  })
}
