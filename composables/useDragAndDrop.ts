import type { DealStatus, ICard } from '@/types'

export const useDragAndDrop = () => {
  const isDraggingOver = ref(false)

  const onDragStart = (e: DragEvent, deal: ICard, emit: (event: 'dragstart', deal: ICard) => void) => {
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', JSON.stringify(deal))
      emit('dragstart', deal)
    }
  }

  const onDragEnd = (emit: (event: 'dragend') => void) => {
    emit('dragend')
  }

  const onDragOver = (e: DragEvent) => {
    e.preventDefault()
    isDraggingOver.value = true
  }

  const onDragLeave = () => {
    isDraggingOver.value = false
  }

  const onDrop = (
    e: DragEvent,
    emit: (event: 'drop', deal: ICard, newStatus: DealStatus) => void,
    newStatus: DealStatus
  ) => {
    e.preventDefault()
    isDraggingOver.value = false

    const dealData = e.dataTransfer?.getData('text/plain')
    if (!dealData) return

    const deal = JSON.parse(dealData) as ICard
    emit('drop', deal, newStatus)
  }

  return {
    isDraggingOver,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDragLeave,
    onDrop
  }
}
