import { useQuery, useQueryClient, useMutation, QueryKey } from 'react-query'
import { useReuqest } from '@/hooks'

import { Kanban } from '@/types/kanban'

export function useKanbans(param?: Partial<Kanban>) {
  const client = useReuqest()

  // 使用useQuery替代useAsync
  return useQuery<Kanban[], Error>(['kanbans', param], () => {
    return client('kanbans', { data: param })
  })
}

export function useAddProject(queryKey: QueryKey) {
  const client = useReuqest()

  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`projects`, {
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
