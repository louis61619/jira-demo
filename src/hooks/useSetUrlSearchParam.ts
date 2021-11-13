import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'
import { cleanObject } from '@/utils/clean-object'

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params
    }) as URLSearchParamsInit
    return setSearchParams(o)
  }
}
