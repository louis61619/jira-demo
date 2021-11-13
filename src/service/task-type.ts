import { useQuery } from 'react-query'
import { useReuqest } from '@/hooks'

import { TaskType } from '@/types/tast-type'

export function useTaskType(param?: Partial<TaskType>) {
  const client = useReuqest()

  // 使用useQuery替代useAsync
  return useQuery<TaskType[], Error>(['taskTypes', param], () => {
    return client('taskTypes', { data: param })
  })
}
