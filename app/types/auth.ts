import type { Models } from 'node-appwrite'

export type UserDBType = Models.User<Models.Preferences>

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
