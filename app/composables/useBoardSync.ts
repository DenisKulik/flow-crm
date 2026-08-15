const BOARD_SYNC_CHANNEL = 'board-sync'

interface BoardSyncMessage {
  type: 'deals-changed'
  senderId: string
}

export const useBoardSync = () => {
  const channel =
    import.meta.server || typeof BroadcastChannel === 'undefined' ? null : new BroadcastChannel(BOARD_SYNC_CHANNEL)
  const senderId = crypto.randomUUID()

  const notifyChange = () => {
    if (!channel) return
    const message: BoardSyncMessage = { type: 'deals-changed', senderId }
    channel.postMessage(message)
  }

  const listenChanges = (onChange: () => void) => {
    if (!channel) return
    const handler = (event: MessageEvent<BoardSyncMessage>) => {
      if (event.data?.type === 'deals-changed' && event.data?.senderId !== senderId) {
        onChange()
      }
    }
    channel.addEventListener('message', handler)

    return () => {
      channel.removeEventListener('message', handler)
    }
  }

  const close = () => {
    channel?.close()
  }

  return {
    notifyChange,
    listenChanges,
    close
  }
}
