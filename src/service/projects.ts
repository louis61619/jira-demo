// import { useEffect, useCallback } from 'react'
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query'
import { useReuqest, useEditConfig, useDeleteConfig } from '@/hooks'
import { cleanObject } from '@/utils/clean-object'

import { Project } from '@/types/project'
// import { useProjectSearchParams } from '@/hooks'

export function useProjects(param?: Partial<Project>) {
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

  // 使用useQuery替代useAsync
  return useQuery<Project[], Error>(['projects', cleanObject(param)], () => {
    return client('projects', { data: param })
  })
}

export function useEditProject(queryKey: QueryKey) {
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

  // const queryClient = useQueryClient()
  // const [searchParams] = useProjectSearchParams()
  // const queryKey = ['projects', cleanObject(searchParams)]

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    useEditConfig(queryKey)
    // {
    //   onSuccess: () => queryClient.invalidateQueries('projects'),
    //   // 樂觀更新
    //   async onMutate(target) {
    //     const previousItem = queryClient.getQueryData(queryKey)
    //     queryClient.setQueryData(queryKey, (old?: Project[]) => {
    //       return (
    //         old?.map((project) =>
    //           project.id === target.id ? { ...project, ...target } : project
    //         ) || []
    //       )
    //     })
    //     return { previousItem }
    //   },
    //   onError(error, newItem, context) {
    //     queryClient.setQueryData(queryKey, (context as { previousItem: Project[] }).previousItem)
    //   }
    // }
  )
}

export function useAddProject(queryKey: QueryKey) {
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
      onSuccess(data) {
        const previousItem = queryClient.getQueryData(queryKey) as Project[]
        queryClient.setQueryData(queryKey, [...previousItem, data])
      }
    }
    // useAddConfig(queryKey)
  )
}

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useReuqest()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}

export const useProject = (id?: number) => {
  const client = useReuqest()
  return useQuery<Project>(['project', { id }], () => client(`projects/${id}`), {
    enabled: !!id
  })
}
