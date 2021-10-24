import { useEffect, useRef } from 'react'

export function useDocumentTitle(title: string, keepOnUnmount: boolean = true) {
  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) document.title = oldTitle
    }
  })
}
