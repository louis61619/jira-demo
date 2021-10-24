import { useEffect } from 'react'
import { useAsync, useReuqest } from '@/hooks'

import { Project } from '@/page/main/project-list/components/List'
import { SearchPanelProps } from '@/page/main/project-list/components/SearchPanel'

import { cleanObject } from '@/utils/clean-object'

export function useProjects(param: SearchPanelProps['param']) {
  const client = useReuqest()
  const { run, ...result } = useAsync<Project[]>()

  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }))
  }, [param, client])

  return result
}
