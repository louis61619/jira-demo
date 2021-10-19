import { useCallback } from 'react'

import { useAuth } from './useAuth'
import { request } from '@/service'

export const useReuqest = () => {
  const { user } = useAuth()

  return useCallback(
    (...[endpoint, config]: Parameters<typeof request>) => {
      return request(endpoint, { ...config, token: user?.token })
    },
    [user]
  )
}

// Utility Type
// Parameters 能夠讀取函數的參數並以tuple的形式返回

// type Person = {
//   name: string
//   age: number
// }

// Partial 能夠獲取某個type並將其中的所有屬性都改為可選的
// const stu: Partial<Person> = {
//   name: 'jfeoifjeo'
// }

// Omit 可以刪除某個type中的某些屬性
// const teacher: Omit<Person, 'name'> = {
//   age: 1222
// }
// const man: Omit<Person, 'name' | 'age'> = {
//   fiejf: 'fjowjfiw'
// }

// type PersonKeys = keyof Person
// const aa: PersonKeys = 'age'
