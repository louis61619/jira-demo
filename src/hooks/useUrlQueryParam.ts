import { useMemo, useState } from 'react'
import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'

import { cleanObject } from '@/utils/clean-object'

/**
 * 返回url頁面中指定ㄉ的參數值
 */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [stateKeys] = useState(keys)

  // 加入 as const 鎖定陣列中的每個item的類型
  // 頁面重新渲染會重新創建物件 所以會導致無限渲染
  return [
    useMemo(() => {
      return stateKeys.reduce((prev, key: string) => {
        return { ...prev, [key]: searchParams.get(key) || '' }
      }, {} as { [key in K]: string })
    }, [searchParams, stateKeys]),
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
