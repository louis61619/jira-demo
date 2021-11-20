import { useAsync } from '@/hooks'
import { act, renderHook } from '@testing-library/react-hooks'

const defaultState: ReturnType<typeof useAsync> = {
  stat: 'idle',
  data: null,
  error: null,

  isIdle: true,
  isLoading: false,
  isError: false,
  isSuccess: false,

  run: expect.any(Function),
  setData: expect.any(Function),
  setError: expect.any(Function),
  retry: expect.any(Function)
}

const loadingState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: 'loading',
  isIdle: false,
  isLoading: true
}

const successState: ReturnType<typeof useAsync> = {
  ...defaultState,
  stat: 'success',
  isIdle: false,
  isSuccess: true
}

test('useAsync可以非同步處理', async () => {
  let resolve: any
  // let reject: any
  const promise = new Promise((res, rej) => {
    resolve = res
    // reject = rej
  })

  const { result } = renderHook(() => useAsync())
  expect(result.current).toEqual(defaultState)

  let p: Promise<any>
  // 因為setState是非同步的所以要使用act包裹
  act(() => {
    p = result.current.run(promise)
  })
  expect(result.current).toEqual(loadingState)

  const resolvedValue = { mockedValue: 'resolved' }
  await act(async () => {
    resolve(resolvedValue)
    // 等待promise返回
    await p
  })
  expect(result.current).toEqual({
    ...successState,
    data: resolvedValue
  })
})
