import { getPrice } from '@/utils/getPrice'
import { loadFromStorage, saveToStorage } from '@/utils/localStorage'
import type { Movie } from '@/types/movie'
import type { ActionContext } from 'vuex/types/index.d.ts'
import type { RootState } from '@/store'
export interface CartState {
  items: Movie[]
}

const CART_STORAGE_KEY = '@app/cart'

export default {
  namespaced: true,
  state: (): CartState => ({
    items: loadFromStorage<Movie[]>(CART_STORAGE_KEY) || [],
  }),
  actions: {
    tryAddToCart({ state, commit, dispatch }: ActionContext<CartState, RootState>, movie: Movie) {
      const alreadyAdded = state.items.some((item: Movie) => item.id === movie.id)

      if (alreadyAdded) {
        dispatch(
          'toast/showToast',
          {
            message: `"${movie.title}" já está no carrinho.`,
            type: 'warning',
          },
          { root: true },
        )
        return
      }

      commit('addToCart', movie)
      dispatch(
        'toast/showToast',
        {
          message: `"${movie.title}" adicionado ao carrinho!`,
          type: 'success',
        },
        { root: true },
      )
    },
  },
  mutations: {
    addToCart(state: CartState, movie: Movie) {
      const alreadyAdded = state.items.some((item) => item.id === movie.id)

      if (!alreadyAdded) {
        state.items.push(movie)
        saveToStorage(CART_STORAGE_KEY, state.items)
      }
    },
    removeFromCart(state: CartState, movieId: number) {
      state.items = state.items.filter((item) => item.id !== movieId)
      saveToStorage(CART_STORAGE_KEY, state.items)
    },
    clearCart(state: CartState) {
      state.items = []
      saveToStorage(CART_STORAGE_KEY, [])
    },
  },
  getters: {
    cartTotal: (state: CartState) => {
      return state.items.reduce((acc, item) => acc + getPrice(item.id), 0)
    },
    cartCount: (state: CartState) => state.items.length,
  },
}
