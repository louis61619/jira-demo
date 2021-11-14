import React, { forwardRef } from 'react'
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd'
import { Kanban } from '@/types/kanban'

import TaskCard from './TaskCard'
// import { ScrollContainer } from './style'
import { useTaskModal } from '../hooks/useTaskModal'
import { Task } from '@/types/task'
import styled from '@emotion/styled'

interface Props {
  tasks: Task[]
  kanban: Kanban
}

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: 600px;
`
const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 600px;
`

const InnerList = ({ dropProvided, tasks }: { dropProvided: DroppableProvided; tasks: Task[] }) => {
  const { startEdit } = useTaskModal()
  return (
    <div>
      {/* -fjieowjio */}
      <DropZone ref={dropProvided.innerRef}>
        {tasks.map((task, index) => {
          return (
            <Draggable key={task.id} draggableId={'task' + task.id} index={index}>
              {(provided) => (
                <div
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                >
                  <TaskCard startEdit={startEdit} task={task} />
                </div>
              )}
            </Draggable>
          )
        })}
        {dropProvided.placeholder}
      </DropZone>
    </div>
  )
}

const TaskList = forwardRef<HTMLDivElement, Props>(({ tasks, kanban, ...props }, ref) => {
  // const [param] = useTasksSearchParmas()
  // const { data: allTasks } = useTasks(param)
  // const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)

  return (
    <Droppable type="ROW" direction="vertical" droppableId={'task' + kanban.id}>
      {(dropProvided) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
          {...dropProvided.droppableProps}
        >
          <ScrollContainer>
            <InnerList dropProvided={dropProvided} tasks={tasks} />
          </ScrollContainer>
        </div>
      )}
    </Droppable>
  )
})

export default TaskList
