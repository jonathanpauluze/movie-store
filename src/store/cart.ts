import type { Movie } from '@/types/movie'

export interface CartState {
  items: Movie[]
}

export default {
  namespaced: true,
  state: (): CartState => ({
    items: [],
  }),
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
    cartTotal: (state: CartState) => state.items.length * 9.99, // Valor mockado para teste
    cartCount: (state: CartState) => state.items.length,
  },
}
