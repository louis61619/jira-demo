import { DropResult } from 'react-beautiful-dnd'
import { useKanbans, useReorderKanban } from '@/service/kanban'
import {
  useKanbanQueryKey,
  useKanbanSearchParams,
  useTasksQueryKey,
  useTasksSearchParmas
} from './useKanbans'
import { useCallback } from 'react'
import { useReorderTasks, useTasks } from '@/service/task'

export const useDragEnd = () => {
  const [kanbanParams] = useKanbanSearchParams()
  const [taskParams] = useTasksSearchParmas()

  const { data: kanbans } = useKanbans(kanbanParams)
  const { mutate: reorderKanban } = useReorderKanban(useKanbanQueryKey())

  const { data: allTasks = [] } = useTasks(taskParams)
  const { mutate: reorderTask } = useReorderTasks(useTasksQueryKey())

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) return
      // 橫向排序
      if (type === 'COLUMN') {
        const fromId = kanbans?.[source.index].id
        const toId = kanbans?.[destination.index].id
        if (!fromId || !toId || fromId === toId) {
          return
        }
        const type = destination.index > source.index ? 'after' : 'before'
        reorderKanban({ fromId, referenceId: toId, type })
      }

      // 縱向排序
      if (type === 'ROW') {
        const fromKanbanId = +source.droppableId
        const toKanbanId = +destination.droppableId
        // console.log(destination, source)
        // console.log(fromKanbanId, toKanbanId)
        // if (fromKanbanId === toKanbanId) return

        const fromTask = allTasks.filter((task) => task.kanbanId === fromKanbanId)[source.index]
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[destination.index]

        if (fromTask?.id === toTask?.id) return

        console.log(fromTask)

        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type: fromKanbanId === toKanbanId && destination.index > source.index ? 'after' : 'before'
        })
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  )
}
