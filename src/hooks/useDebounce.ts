import { useState, useEffect } from 'react'

export const useDebounce = <V>(value: V, delay: number = 1000) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    let timer: any
    timer = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    // 類似於update，會在下一個useEfffect執行前運行
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debounceValue
}
