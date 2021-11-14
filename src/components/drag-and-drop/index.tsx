// import React, { ReactNode } from 'react'
// import {
//   Draggable,
//   DraggableProps,
//   Droppable,
//   DroppableProps,
//   DroppableProvided,
//   DroppableProvidedProps
// } from 'react-beautiful-dnd'

// // 替代某個接口的其中一個屬性 這邊是children
// type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode }
// type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode }

// type DropChildProps = Partial<{ provided: DroppableProvided } & DroppableProvidedProps> &
//   React.HTMLAttributes<HTMLDivElement>

// export const Drop = ({ children, ...props }: DropProps) => {
//   return (
//     <Droppable {...props}>
//       {(provided) => {
//         if (React.isValidElement(children)) {
//           return React.cloneElement(children, {
//             ...provided.droppableProps,
//             ref: provided.innerRef,
//             provided
//           })
//         }
//         return <div />
//       }}
//     </Droppable>
//   )
// }

// export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
//   ({ children, ...props }, ref) => {
//     return (
//       <div ref={ref} {...props}>
//         {children}
//         {props.provided?.placeholder}
//       </div>
//     )
//   }
// )

// export const Drag = ({ children, ...props }: DragProps) => {
//   return (
//     <Draggable {...props}>
//       {(provided) => {
//         if (React.isValidElement(children)) {
//           return React.cloneElement(children, {
//             ...provided.draggableProps,
//             ...provided.dragHandleProps,
//             ref: provided.innerRef
//           })
//         }
//         return <div />
//       }}
//     </Draggable>
//   )
// }

import React, { ReactNode } from 'react'
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps
} from 'react-beautiful-dnd'

type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode }

export const Drop = ({ children, ...props }: DropProps) => {
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided
          })
        }
        return <div />
      }}
    </Droppable>
  )
}

type DropChildProps = Partial<{ provided: DroppableProvided } & DroppableProvidedProps> &
  React.HTMLAttributes<HTMLDivElement>
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
      {props.provided?.placeholder}
    </div>
  )
)

type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode }
export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef
          })
        }
        return <div />
      }}
    </Draggable>
  )
}
