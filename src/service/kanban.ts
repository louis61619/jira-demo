import { useQuery, useQueryClient, useMutation, QueryKey } from 'react-query'
import { useReuqest, useDeleteConfig, useReorderKanbanConfig } from '@/hooks'

import { SortProps } from '@/types'
import { Kanban } from '@/types/kanban'

export function useKanbans(param?: Partial<Kanban>) {
  const client = useReuqest()

  // 使用useQuery替代useAsync
  return useQuery<Kanban[], Error>(['kanbans', param], () => {
    return client('kanbans', { data: param })
  })
}

export function useAddKanban(queryKey: QueryKey) {
  const client = useReuqest()

  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: 'POST'
      }),
    {
      onSuccess(data) {
        const previousItem = queryClient.getQueryData(queryKey) as Kanban[]
        queryClient.setQueryData(queryKey, [...previousItem, data])
      }
    }
  )
}

export const useDeleteKanben = (queryKey: QueryKey) => {
  const client = useReuqest()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`kanbans/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useReuqest()
  return useMutation((params: SortProps) => {
    return client('kanbans/reorder', {
      data: params,
      method: 'POST'
    })
  }, useReorderKanbanConfig(queryKey))
}
