import { useQuery, useQueryClient, useMutation, QueryKey } from 'react-query'
import { useReuqest, useDeleteConfig, useEditConfig } from '@/hooks'

import { Epic } from '@/types/epic'

export function useEpics(param?: Partial<Epic>) {
  const client = useReuqest()

  // 使用useQuery替代useAsync
  return useQuery<Epic[], Error>(['epics', param], () => {
    return client('epics', { data: param })
  })
}

export function useAddEpic(queryKey: QueryKey) {
  const client = useReuqest()

  const queryClient = useQueryClient()

  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: 'POST'
      }),
    {
      onSuccess(data) {
        const previousItem = queryClient.getQueryData(queryKey) as Epic[]
        queryClient.setQueryData(queryKey, [...previousItem, data])
      }
    }
  )
}

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useReuqest()

  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}

export function useEditEpic(queryKey: QueryKey) {
  const client = useReuqest()

  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics/${params.id}`, {
        data: params,
        method: 'PATCH'
      }),
    useEditConfig(queryKey)
  )
}

export const useEpic = (id?: number) => {
  const client = useReuqest()
  return useQuery<Epic>(['project', { id }], () => client(`epics/${id}`), {
    enabled: !!id
  })
}
