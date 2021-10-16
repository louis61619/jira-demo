import { useState } from 'react'

export function useArray<T>(array: T[]) {
  const [currentArr, setCurrentArr] = useState(array)

  const clear = () => {
    setCurrentArr([])
  }

  const removeIndex = (removeIndeex: number) => {
    setCurrentArr(
      currentArr.filter((item, index) => {
        return index !== removeIndeex
      })
    )
  }

  const add = (item: T) => {
    setCurrentArr([...currentArr, item])
  }

  return [currentArr, clear, removeIndex, add]
}
