import type { CartState } from './modules/cart'
import type { FavoritesState } from './modules/favorites'
import type { ToastState } from './modules/toast'

export interface RootState {
  cart: CartState
  favorites: FavoritesState
  toast: ToastState
}
