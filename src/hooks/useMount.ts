import { useEffect, useState, useRef } from 'react'

export function useMount(callback: () => void) {
  useEffect(() => {
    callback()
  }, [])
}

export function useUnMount() {
  const [didMount, setDidMount] = useState(false)
  useEffect(() => {
    setDidMount(true)
    return () => setDidMount(false)
  }, [])

  if (!didMount) {
    return null
  }

  return [didMount, setDidMount]
}

/**
 * 用於返回組件的掛載狀態 如果還沒有掛載或是已經卸載返回false
 */
export function useMountedRef() {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  return {
    mountedRef
  }
}
