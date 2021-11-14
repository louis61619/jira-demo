import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useSetUrlSearchParam } from './useSetUrlSearchParam'

/**
 * 返回url頁面中指定ㄉ的參數值
 */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams()
  const setSearchParams = useSetUrlSearchParam()
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
    useCallback(
      (params: Partial<{ [key in K]: unknown }>) => {
        // Object.fromEntries 可以取得物件的iterator並將其轉化爲key: string的物件
        return setSearchParams(params)
      },
      [setSearchParams]
    )
  ] as const
}
