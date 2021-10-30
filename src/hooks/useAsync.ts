import { useState } from 'react'
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

export const useAsync = <D>(initialState?: AsyncState<D>, initialConfig?: typeof defaultConfig) => {
  const config = {
    ...defaultConfig,
    ...initialConfig
  }
  const [state, setstate] = useState({
    ...defaultInitialState,
    ...initialState
  })

  const { mountedRef } = useMountedRef()

  // useState會進行一個惰性初始化的操作，所以要保存兩層
  const [retry, setRetry] = useState(() => () => {})

  const setData = (data: D) =>
    setstate({
      data,
      stat: 'success',
      error: null
    })

  const setError = (error: Error) =>
    setstate({
      error,
      stat: 'error',
      data: null
    })

  const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    if (!promise || !promise.then) {
      throw new Error('需傳入promise類型')
    }

    // 這邊不太了解
    // 應該是一開始是傳入promise，第二次則重新調用函數獲取promsie
    setRetry(() => () => {
      runConfig?.retry && run(runConfig.retry(), runConfig)
    })

    // 如果在useCallback中使用到state會導致無限循環
    setstate({ ...state, stat: 'loading' })
    return promise
      .then((data) => {
        if (mountedRef.current) {
          setData(data)
        }
        return data
      })
      .catch((err) => {
        setError(err)
        if (config.throwOnError === true) {
          return Promise.reject(err)
        }
        return err
      })
  }

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
