import { useEffect, useState } from 'react'

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
