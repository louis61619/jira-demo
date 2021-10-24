import { useAsync, useReuqest, useMount } from '@/hooks'

import { User } from '@/types'

export function useUsers() {
  const client = useReuqest()
  const { run, ...result } = useAsync<User[]>()

  useMount(() => {
    run(client('users'))
  })

  return result
}
