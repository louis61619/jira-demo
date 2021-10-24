import { cleanObject } from '@/utils/clean-object'
import { useMemo } from 'react'
import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'

/**
 * 返回url頁面中指定ㄉ的參數值
 */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()

  // 加入 as const 鎖定陣列中的每個item的類型
  // 頁面重新渲染會重新創建物件 所以會導致無限渲染
  return [
    useMemo(() => {
      return keys.reduce((prev, key: string) => {
        return { ...prev, [key]: searchParams.get(key) || '' }
      }, {} as { [key in K]: string })
    }, [searchParams]),
    // setSearchParam
    (params: Partial<{ [key in K]: unknown }>) => {
      // Object.fromEntries 可以取得物件的iterator並將其轉化爲key: string的物件
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params
      }) as URLSearchParamsInit
      return setSearchParams(o)
    }
  ] as const
}
