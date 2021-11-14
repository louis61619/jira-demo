import { useReuqest } from '@/hooks'

import { User } from '@/types/user'
import { useQuery } from 'react-query'

export function useUsers() {
  const client = useReuqest()

  return useQuery<User[], Error>(['users'], () => {
    return client('users')
  })
  // const { run, ...result } = useAsync<User[]>()

  // useMount(() => {
  //   run(client('users'))
  // })
  // useEffect(() => {
  //   run(client('users'))
  // }, [run, client])

  // useMount(
  //   useCallback(() => {
  //     run(client('users'))
  //   }, [run, client])
  // )

  // return result
}

// export function useTasks(param?: Partial<Task>) {
//   const client = useReuqest()

//   // 使用useQuery替代useAsync
//   return useQuery<Task[], Error>(['tasks', param], () => {
//     return client('tasks', { data: param })
//   })
// }
