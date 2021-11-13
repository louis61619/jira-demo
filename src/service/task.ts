import { useQuery } from 'react-query'
import { useReuqest } from '@/hooks'

import { Task } from '@/types/task'

export function useTasks(param?: Partial<Task>) {
  const client = useReuqest()

  // 使用useQuery替代useAsync
  return useQuery<Task[], Error>(['tasks', param], () => {
    return client('tasks', { data: param })
  })
}
