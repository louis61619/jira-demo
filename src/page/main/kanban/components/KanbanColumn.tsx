import React, { forwardRef, ReactNode } from 'react'
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps
} from 'react-beautiful-dnd'
import { Kanban } from '@/types/kanban'
import { useTasks } from '@/service/task'

import { useTasksSearchParmas } from '../hooks/useKanbans'
import CreateTask from './CreateTask'
import TaskCard from './TaskCard'
import KanbanColumnMenu from './KanbanColumnMenu'
import { KanbanColumnWrapper, TasksWrapper, ScrollContainer, DropContainer } from './style'
import { useTaskModal } from '../hooks/useTaskModal'
import { Drag, Drop, DropChild } from '@/components/drag-and-drop'

interface Props {
  kanban: Kanban
  children: ReactNode
}

const KanbanColum = forwardRef<HTMLDivElement, Props>(({ kanban, children, ...props }, ref) => {
  const [param] = useTasksSearchParmas()
  const { data: allTasks } = useTasks(param)
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)
  const { startEdit } = useTaskModal()

  return (
    <KanbanColumnWrapper ref={ref} {...props}>
      {/* <Drop type="ROW" direction="vertical" droppableId={'task' + kanban.id}>
          <DropContainer>
            <div className="title">
              <h3>{kanban.name}</h3>
              <KanbanColumnMenu kanban={kanban} />
            </div>
            <CreateTask kanbanId={kanban.id} />
            <TasksWrapper>
              {tasks?.map((task, index) => (
                <Drag key={task.id} index={index} draggableId={'task' + task.id}>
                  <div>
                    <TaskCard startEdit={startEdit} task={task} />
                  </div>
                </Drag>
              ))}
            </TasksWrapper>
          </DropContainer>
        </Drop> */}

      {children}

      <Droppable type="ROW" direction="vertical" droppableId={'task' + kanban.id}>
        {(dropProvided) => (
          <div {...dropProvided.droppableProps}>
            <ScrollContainer>
              <div>
                <TasksWrapper ref={dropProvided.innerRef}>
                  {tasks?.map((task, index) => (
                    <Draggable key={task.id} index={index} draggableId={'task' + task.id}>
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
                  ))}
                  {dropProvided.placeholder}
                </TasksWrapper>
              </div>
            </ScrollContainer>
          </div>
        )}
      </Droppable>
    </KanbanColumnWrapper>
  )
})

export default KanbanColum

// export default function QuoteList(props: Props) {
//   const {
//     ignoreContainerClipping,
//     internalScroll,
//     scrollContainerStyle,
//     isDropDisabled,
//     isCombineEnabled,
//     listId = 'LIST',
//     listType,
//     style,
//     quotes,
//     title,
//     useClone
//   } = props

//   return (
//     <Droppable
//       droppableId={listId}
//       type={listType}
//       ignoreContainerClipping={ignoreContainerClipping}
//       isDropDisabled={isDropDisabled}
//       isCombineEnabled={isCombineEnabled}
//       renderClone={
//         useClone
//           ? (provided, snapshot, descriptor) => (
//               <QuoteItem
//                 quote={quotes[descriptor.source.index]}
//                 provided={provided}
//                 isDragging={snapshot.isDragging}
//                 isClone
//               />
//             )
//           : null
//       }
//     >
//       {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => (
//         <Wrapper
//           style={style}
//           isDraggingOver={dropSnapshot.isDraggingOver}
//           isDropDisabled={isDropDisabled}
//           isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
//           {...dropProvided.droppableProps}
//         >
//           <ScrollContainer style={scrollContainerStyle}>
//             <InnerList quotes={quotes} title={title} dropProvided={dropProvided} />
//           </ScrollContainer>
//         </Wrapper>
//       )}
//     </Droppable>
//   )
// }
