import type { Movie } from '@/types/movie'

export interface FavoritesState {
  items: Movie[]
}

export default {
  namespaced: true,
  state: (): FavoritesState => ({
    items: [],
  }),
  mutations: {
    toggleFavorite(state: FavoritesState, movie: Movie) {
      const index = state.items.findIndex((item) => item.id === movie.id)
      if (index !== -1) {
        state.items.splice(index, 1)
      } else {
        state.items.push(movie)
      }
    },
    removeFavorite(state: FavoritesState, movieId: number) {
      state.items = state.items.filter((item) => item.id !== movieId)
    },
    clearFavorites(state: FavoritesState) {
      state.items = []
    },
  },
  getters: {
    isFavorite: (state: FavoritesState) => (id: number) =>
      state.items.some((item) => item.id === id),
    favoritesCount: (state: FavoritesState) => state.items.length,
  },
}
