import { QueryKey, useQueryClient } from 'react-query'
import { reorder } from '@/utils/reorder'
import { Task } from '@/types/task'

export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient()

  return {
    // 如果在返回成功之後進行狀態效驗會和後續的更新衝突
    // onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old)
      })
      const previousItem = queryClient.getQueryData(queryKey)
      return { previousItem }
    },
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItem)
    }
  }
}

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    return old?.filter((item) => item.id !== target.id) || []
  })

export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    return old?.map((item) => (item.id === target.id ? { ...item, ...target } : item)) || []
  })

// 由於有id的關係所以不能做樂觀更新
// export const useAddConfig = (queryKey: QueryKey) =>
//   useConfig(queryKey, (target, old) => {
//     console.log(target)
//     return old ? [...old, target] : []
//   })

export const useReorderKanbanConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => reorder({ list: old, ...target }))

export const useReorderTaskConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[]
    const lastList = orderedList.map((item) =>
      item.id === target.fromId ? { ...item, kanbanId: target.toKanbanId } : item
    )
    // console.log(lastList)
    return lastList
  })
