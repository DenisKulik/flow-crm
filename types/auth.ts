export interface IUser {
  email: string
  name: string
  status: boolean
}

export interface IUserForm {
  email: string
  name?: string
  password: string
}
