import { useQuery, useQueryClient, useMutation, QueryKey } from 'react-query'
import { useReuqest, useEditConfig, useDeleteConfig } from '@/hooks'

import { Task } from '@/types/task'

export function useTasks(param?: Partial<Task>) {
  const client = useReuqest()

  // 使用useQuery替代useAsync
  return useQuery<Task[], Error>(['tasks', param], () => {
    return client('tasks', { data: param })
  })
}

export function useAddTask(queryKey: QueryKey) {
  const client = useReuqest()

  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: 'POST'
      }),
    {
      onSuccess(data) {
        const previousItem = (queryClient.getQueryData(queryKey) as Task[]) || []
        console.log(queryKey)
        queryClient.setQueryData(queryKey, [...previousItem, data])
      }
    }
  )
}

export function useEditTask(queryKey: QueryKey) {
  const client = useReuqest()
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    // 只修改了任務列表的緩存，而沒有修改單個任務的緩存
    useEditConfig(queryKey)
  )
}

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useReuqest()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}

export const useTask = (id?: number) => {
  const client = useReuqest()
  return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), {
    enabled: !!id
  })
}
