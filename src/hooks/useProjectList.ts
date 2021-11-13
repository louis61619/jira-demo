import { useMemo } from 'react'
import { cleanObject } from '@/utils/clean-object'
import { useUrlQueryParam } from '@/hooks'

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])

  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam
  ] as const
}

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParams()
  return ['projects', cleanObject(params)]
}
