import { useReducer } from 'react'

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
  // 過去的狀態
  past: T[]
  // 當前的狀態
  present: T
  // 未來的狀態
  future: T[]
}

type Action<T> = { newPresent?: T; type: typeof UNDO | typeof REDO | typeof SET | typeof RESET }

const createUndoReducer =
  <T>() =>
  (state: State<T>, action: Action<T>): State<T> => {
    const { past, present, future } = state
    const { type, newPresent } = action

    switch (type) {
      case UNDO:
        // 如果沒有返回
        if (past.length === 0) return state
        // 上一個動作
        const previos = past[past.length - 1]
        // 新的過去操作
        const newPast = past.slice(0, past.length - 1)
        return {
          past: newPast,
          present: previos,
          future: [present, ...future]
        }

      case REDO:
        // 如果沒有返回
        if (future.length === 0) return state
        // 最近的下一個動作
        const next = future[0]
        // 新的未來操作
        const newFuture = future.slice(1)
        return {
          past: [...past, present],
          present: next,
          future: newFuture
        }

      case SET:
        // if (newPresent === present) return state
        return {
          past: [...past, present],
          present: newPresent!,
          // 重置未來操作
          future: []
        }

      case RESET:
        return {
          past: [],
          present: newPresent!,
          future: []
        }
      default:
        return state
    }
  }

export const useUndo = <T>(initialPresent: T) => {
  const undoReducer = createUndoReducer<T>()
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: []
  })

  // 可以上一步
  const canUndo = state.past.length !== 0
  // 可以下一步
  const canRedo = state.future.length !== 0
  // 上一步
  const undo = () => dispatch({ type: 'UNDO' })
  // 下一步
  const redo = () => dispatch({ type: 'REDO' })
  const set = (newPresent: T) => dispatch({ type: 'SET', newPresent })
  const reset = (newPresent: T) => dispatch({ type: 'RESET', newPresent })

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const
}
