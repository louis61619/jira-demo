import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps
} from 'react-beautiful-dnd'

export type DragProps = DraggableProvidedDragHandleProps & DraggableProvidedDraggableProps

export const useDropProps = (props?: DragProps) => {
  return {
    draggableProps: {
      style: props?.style,
      'data-rbd-draggable-context-id': props?.['data-rbd-draggable-context-id'],
      'data-rbd-draggable-id': props?.['data-rbd-draggable-id'],
      onTransitionEnd: props?.onTransitionEnd
    },
    dragHandleProps: {
      'data-rbd-drag-handle-draggable-id': props?.['data-rbd-drag-handle-draggable-id'],
      'data-rbd-drag-handle-context-id': props?.['data-rbd-drag-handle-context-id'],
      'aria-describedby': props?.['aria-describedby'],
      role: props?.role,
      tabIndex: props?.tabIndex,
      draggable: props?.draggable,
      onDragStart: props?.onDragStart
    }
  }
}
