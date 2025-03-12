import { Home, type LucideProps, UsersRound } from 'lucide-vue-next'
import type { FunctionalComponent } from 'vue'

export interface IMenuItem {
  id: number
  title: string
  url: string
  icon: FunctionalComponent<LucideProps, {}, any, {}>
}

export const MENU_ITEMS: IMenuItem[] = [
  { id: 1, title: 'Home', url: '/', icon: Home },
  { id: 2, title: 'Customers', url: '/customers', icon: UsersRound }
]
