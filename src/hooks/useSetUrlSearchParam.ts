import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'
import { cleanObject } from '@/utils/clean-object'
import { useCallback } from 'react'

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return useCallback(
    (params: { [key in string]: unknown }) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params
      }) as URLSearchParamsInit
      return setSearchParams(o)
    },
    [setSearchParams, searchParams]
  )
}
