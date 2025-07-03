import { getPrice } from '@/utils/getPrice'
import type { Movie } from '@/types/movie'
import type { ActionContext } from 'vuex/types/index.d.ts'
import type { RootState } from '@/store'
export interface CartState {
  items: Movie[]
}

export default {
  namespaced: true,
  state: (): CartState => ({
    items: [],
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
      }
    },
    removeFromCart(state: CartState, movieId: number) {
      state.items = state.items.filter((item) => item.id !== movieId)
    },
    clearCart(state: CartState) {
      state.items = []
    },
  },
  getters: {
    cartTotal: (state: CartState) => {
      return state.items.reduce((acc, item) => acc + getPrice(item.id), 0)
    },
    cartCount: (state: CartState) => state.items.length,
  },
}
