import { loadFromStorage, saveToStorage } from '@/utils/localStorage'
import type { Movie } from '@/types/movie'

export interface FavoritesState {
  items: Movie[]
}

const FAVORITES_STORAGE_KEY = '@app/favorites'

export default {
  namespaced: true,
  state: (): FavoritesState => ({
    items: loadFromStorage<Movie[]>(FAVORITES_STORAGE_KEY) || [],
  }),
  mutations: {
    toggleFavorite(state: FavoritesState, movie: Movie) {
      const index = state.items.findIndex((item) => item.id === movie.id)

      if (index !== -1) {
        state.items.splice(index, 1)
      } else {
        state.items.push(movie)
      }

      saveToStorage(FAVORITES_STORAGE_KEY, state.items)
    },
    removeFavorite(state: FavoritesState, movieId: number) {
      state.items = state.items.filter((item) => item.id !== movieId)
      saveToStorage(FAVORITES_STORAGE_KEY, state.items)
    },
    clearFavorites(state: FavoritesState) {
      state.items = []
      saveToStorage(FAVORITES_STORAGE_KEY, [])
    },
  },
  getters: {
    isFavorite: (state: FavoritesState) => (id: number) =>
      state.items.some((item) => item.id === id),
    favoritesCount: (state: FavoritesState) => state.items.length,
  },
}
