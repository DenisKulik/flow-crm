import { nanoid } from 'nanoid'

import { account } from '@/lib/appwrite'
import type { AppwriteUser, IUserForm } from '@/types'

interface IAuthService {
  getAuthUser: () => Promise<AppwriteUser | null>
  login: (values: IUserForm) => Promise<void>
  logout: () => Promise<void>
  register: (values: IUserForm) => Promise<void>
}

export class AuthService implements IAuthService {
  public async getAuthUser(): Promise<AppwriteUser | null> {
    try {
      return await account.get()
    } catch {
      return null
    }
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
