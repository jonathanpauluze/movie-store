import { createStore } from 'vuex'
import favoritesModule from '@/store/modules/favorites'
import { describe, it, expect, beforeEach } from 'vitest'

const mockMovie = {
  id: 101,
  title: 'Filme Favorito',
  genre_ids: [1, 2],
  release_date: '2023-01-01',
  vote_average: 7.9,
  vote_count: 500,
  poster_path: '/poster.jpg',
}

describe('favorites Vuex module', () => {
  let store: ReturnType<typeof createStore>

  beforeEach(() => {
    store = createStore({
      modules: {
        favorites: {
          ...favoritesModule,
          namespaced: true,
        },
      },
    })
  })

  it('adiciona um item aos favoritos', () => {
    store.commit('favorites/toggleFavorite', mockMovie)

    const items = store.state.favorites.items
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual(mockMovie)
  })

  it('remove item chamando função toggle duas vezes com mesmo id', () => {
    store.commit('favorites/toggleFavorite', mockMovie)
    store.commit('favorites/toggleFavorite', mockMovie)

    expect(store.state.favorites.items).toHaveLength(0)
  })

  it('remove um filme dos favoritos', () => {
    store.commit('favorites/toggleFavorite', mockMovie)
    store.commit('favorites/removeFavorite', mockMovie.id)

    expect(store.state.favorites.items).toHaveLength(0)
  })

  it('limpa todos os favoritos', () => {
    store.commit('favorites/toggleFavorite', mockMovie)
    store.commit('favorites/toggleFavorite', { ...mockMovie, id: 202 })

    store.commit('favorites/clearFavorites')

    expect(store.state.favorites.items).toHaveLength(0)
  })

  it('verifica se um filme está nos favoritos (getter)', () => {
    store.commit('favorites/toggleFavorite', mockMovie)

    const isFavorite = store.getters['favorites/isFavorite'](mockMovie.id)
    expect(isFavorite).toBe(true)
  })
})
