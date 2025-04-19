import { nanoid } from 'nanoid'

import { account } from '@/api/appwrite'
import type { IUserForm, UserDBType } from '@/types'

interface IAuthService {
  getAuthUser: () => Promise<UserDBType | null>
  login: (values: IUserForm) => Promise<void>
  logout: () => Promise<void>
  register: (values: IUserForm) => Promise<void>
}

export class AuthService implements IAuthService {
  public async getAuthUser(): Promise<UserDBType> {
    return await account.get()
  }

  public async login(values: IUserForm): Promise<void> {
    const { email, password } = values
    await account.createEmailPasswordSession(email, password)
  }

  public async logout(): Promise<void> {
    await account.deleteSession('current')
  }

  public async register(values: IUserForm): Promise<void> {
    const { email, password, name } = values
    const userId = nanoid()
    await account.create(userId, email, password, name)
  }
}
