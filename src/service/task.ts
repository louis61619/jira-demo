import { useQuery, useQueryClient, useMutation, QueryKey } from 'react-query'
import { useReuqest, useEditConfig, useDeleteConfig, useReorderTaskConfig } from '@/hooks'

import { SortProps } from '@/types'
import { Task } from '@/types/task'
// import { reorder } from '@/utils/reorder'

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
        queryClient.setQueryData(queryKey, [...previousItem, data])
      }
    }
  )
}

export function useEditTask(queryKey: QueryKey) {
  const client = useReuqest()

  // const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    // 只修改了任務列表的緩存，而沒有修改單個任務的緩存
    useEditConfig(queryKey)
    // {
    //   async onMutate(target: any) {
    //     queryClient.setQueryData(queryKey, (old?: any[]) => {
    //       return callback(target, old)
    //     })
    //     const previousItem = queryClient.getQueryData(queryKey)
    //     return { previousItem }
    //   },
    //   onError(error: any, newItem: any, context: any) {
    //     queryClient.setQueryData(queryKey, context.previousItem)
    //   }
    // }
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
  // console.log(id)
  const client = useReuqest()
  return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), {
    enabled: !!id
  })
}

export const useReorderTasks = (queryKey: QueryKey) => {
  const client = useReuqest()
  // const queryClient = useQueryClient()

  return useMutation(
    (params: SortProps) => {
      return client('tasks/reorder', {
        data: params,
        method: 'POST'
      })
    },
    useReorderTaskConfig(queryKey)
    // {
    //   onMutate(target) {
    //     queryClient.setQueryData(queryKey, (old: any) => {
    //       const orderedList = reorder({ list: old, ...target }) as Task[]
    //       const lastList = orderedList.map((item) =>
    //         item.id === target.fromId ? { ...item, kanbanId: target.toKanbanId } : item
    //       )
    //       return lastList
    //     })
    //   },
    //   onError(error, newItem, context: any) {
    //     queryClient.setQueryData(queryKey, context.previousItem)
    //   }
    // }
  )
}
