import { useCallback } from 'react'
import { useAsync, useReuqest, useMount } from '@/hooks'

import { User } from '@/types'

export function useUsers() {
  const client = useReuqest()
  const { run, ...result } = useAsync<User[]>()

  // useMount(() => {
  //   run(client('users'))
  // })
  // useEffect(() => {
  //   run(client('users'))
  // }, [run, client])

  useMount(
    useCallback(() => {
      run(client('users'))
    }, [run, client])
  )

  return result
}
