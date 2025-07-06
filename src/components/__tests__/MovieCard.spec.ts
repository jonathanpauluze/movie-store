import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieCard from '@/components/MovieCard.vue'
import { createStore } from 'vuex'
import type { Movie } from '@/types/movie'

const mockMovie: Movie = {
  id: 1,
  adult: false,
  title: 'The Test Movie - A Journey Begins',
  original_title: 'The Test Movie - A Journey Begins',
  release_date: '2025-07-03',
  vote_average: 8.5,
  vote_count: 1000,
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  genre_ids: [28, 12],
}

vi.mock('@/composables/useGenres', () => ({
  useGenres: () => ({
    resolve: () => ['Ação', 'Aventura'],
  }),
}))

describe('MovieCard', () => {
  let wrapper: ReturnType<typeof mount>
  let store: ReturnType<typeof createStore>

  beforeEach(() => {
    store = createStore({
      modules: {
        favorites: {
          namespaced: true,
          state: () => ({ items: [] }),
          getters: {
            isFavorite: () => () => false,
            favoritesCount: () => 0,
          },
          mutations: {
            toggleFavorite: vi.fn(),
            removeFavorite: vi.fn(),
          },
        },
        cart: {
          namespaced: true,
          getters: {
            isInCart: () => () => false,
          },
        },
      },
    })

    wrapper = mount(MovieCard, {
      props: { movie: mockMovie },
      global: {
        plugins: [store],
      },
    })
  })

  it('renderiza o título do filme', () => {
    expect(wrapper.text()).toContain('The Test Movie - A Journey Begins')
  })

  it('exibe o botão de adicionar', () => {
    expect(wrapper.find('.cart-btn').text()).toContain('Adicionar')
  })

  it('emite evento ao clicar no botão de adicionar', async () => {
    await wrapper.find('.cart-btn').trigger('click')
    expect(wrapper.emitted()['add-to-cart']).toBeTruthy()
  })

  it('exibe o botão de detalhes', () => {
    expect(wrapper.find('.details-btn').text()).toContain('Ver detalhes')
  })

  it('emite evento ao clicar no botão de detalhes', async () => {
    await wrapper.find('.details-btn').trigger('click')
    expect(wrapper.emitted()['select-movie']).toBeTruthy()
  })

  it('exibe o botão de favoritos', () => {
    expect(wrapper.find('.favorite-btn').attributes('aria-label')).toContain(
      'Adicionar aos favoritos',
    )
  })
})
