export type AuthForm = {
  username: string
  password: string
}

export type Raw = string | number

export interface SortProps {
  // 把某個id放在某個id的前面或是後面
  // 要重新排序的item
  fromId: number
  // 目標item
  referenceId: number
  // 前面或是後面
  type: 'before' | 'after'
  // task
  fromKanbanId?: number
  toKanbanId?: number
}
