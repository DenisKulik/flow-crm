export * from './auth'
export * from './board'
export * from './customers'
export * from './deals'

export interface IBaseEntity {
  $id: string
  $createdAt: string
  $updatedAt: string
}

export interface IFormMethods {
  resetForm: () => void
}

export interface IInputFileEvent extends Event {
  target: HTMLInputElement & EventTarget & { files: FileList }
}
