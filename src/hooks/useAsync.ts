import { useState } from 'react'

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

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('需傳入promise類型')
    }
    setstate({ ...state, stat: 'loading' })
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
  }

  return {
    isIdle: state.stat === 'idle',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    isLoading: state.stat === 'loading',
    run,
    setData,
    setError,
    ...state
  }
}
