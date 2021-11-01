import { useState, useCallback, useReducer } from 'react'
import { useMountedRef } from './useMount'

interface AsyncState<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: AsyncState<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const { mountedRef } = useMountedRef()

  return useCallback(
    (...args: T[]) => {
      mountedRef.current ? dispatch(...args) : void 0
    },
    [mountedRef, dispatch]
  )
}

export const useAsync = <D>(initialState?: AsyncState<D>, initialConfig?: typeof defaultConfig) => {
  const config = {
    ...defaultConfig,
    ...initialConfig
  }
  // const [state, setstate] = useState({
  //   ...defaultInitialState,
  //   ...initialState
  // })
  // 使用 useReducer 自動將新的state和舊的state進行合併
  const [state, dispatch] = useReducer(
    (state: AsyncState<D>, action: Partial<AsyncState<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState
    }
  )

  // const { mountedRef } = useMountedRef()
  const safeDispatch = useSafeDispatch(dispatch)

  // useState會進行一個惰性初始化的操作，所以要保存兩層
  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: 'success',
        error: null
      }),
    [safeDispatch]
  )

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: 'error',
        data: null
      }),
    [safeDispatch]
  )

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('需傳入promise類型')
      }

      // 這邊不太了解
      // 應該是一開始是傳入promise，第二次則重新調用函數獲取promsie
      setRetry(() => () => {
        runConfig?.retry && run(runConfig.retry(), runConfig)
      })

      // 如果在useCallback中使用到state會導致無限循環
      // setstate((preState) => ({ ...preState, stat: 'loading' }))
      safeDispatch({ stat: 'loading' })
      return promise
        .then((data) => {
          setData(data)
          return data
        })
        .catch((err) => {
          setError(err)
          if (config.throwOnError === true) {
            return Promise.reject(err)
          }
          return err
        })
    },
    [config.throwOnError, safeDispatch, setError, setData]
  )

  return {
    isIdle: state.stat === 'idle',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    isLoading: state.stat === 'loading',
    run,
    setData,
    setError,
    ...state,
    retry
  }
}
