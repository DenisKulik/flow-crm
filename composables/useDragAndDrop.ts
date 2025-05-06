import type { DealStatus, ICard } from '@/types'

export const useDragAndDrop = () => {
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
    e.dataTransfer!.dropEffect = 'move'
  }

  const onDrop = (
    e: DragEvent,
    emit: (event: 'drop', deal: ICard, newStatus: DealStatus) => void,
    newStatus: DealStatus
  ) => {
    e.preventDefault()
    const data = e.dataTransfer?.getData('text/plain')
    if (data) {
      const deal = JSON.parse(data) as ICard
      emit('drop', deal, newStatus)
    }
  }

  return {
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop
  }
}
