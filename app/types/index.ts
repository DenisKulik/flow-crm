export * from './auth'
export * from './board'
export * from './comments'
export * from './customers'
export * from './deals'

export interface IBaseEntity {
  $id: string
  $sequence: number
  $createdAt: string
  $updatedAt: string
  $permissions: string[]
  $databaseId: string
  $tableId: string
}

export interface IFormMethods {
  resetForm: () => void
}

export interface IInputFileEvent extends Event {
  target: HTMLInputElement & EventTarget & { files: FileList }
}
