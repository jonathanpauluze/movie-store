import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FavoritesSidebar from '@/components/FavoritesSidebar.vue'
import { createStore } from 'vuex'
import type { Store } from 'vuex/types/index.d.ts'
import type { RootState } from '@/store'

const mockMovie = {
  id: 1,
  title: 'Filme Favorito',
  genre_ids: [],
  release_date: '',
  vote_average: 0,
  vote_count: 0,
  poster_path: '',
}

let tryAddToCartMock: ReturnType<typeof vi.fn>
let removeFavoriteMock: ReturnType<typeof vi.fn>
let clearFavoritesMock: ReturnType<typeof vi.fn>
let store: Store<RootState>

function createMockStore(favoritesItems = [mockMovie]) {
  tryAddToCartMock = vi.fn()
  removeFavoriteMock = vi.fn()
  clearFavoritesMock = vi.fn()

  return createStore({
    modules: {
      favorites: {
        namespaced: true,
        state: () => ({ items: favoritesItems }),
        getters: {
          favoritesCount: () => favoritesItems.length,
          isFavorite: () => () => true,
        },
        mutations: {
          removeFavorite: removeFavoriteMock,
          clearFavorites: clearFavoritesMock,
        },
      },
      cart: {
        namespaced: true,
        state: () => ({ items: [] }),
        actions: {
          tryAddToCart: tryAddToCartMock,
        },
      },
      toast: {
        namespaced: true,
        actions: {
          showToast: vi.fn(),
        },
      },
    },
  })
}

describe('FavoritesSidebar', () => {
  beforeEach(() => {
    store = createMockStore()
  })

  it('chama tryAddToCart quando botão é clicado', async () => {
    const wrapper = mount(FavoritesSidebar, {
      props: { open: true },
      global: { plugins: [store] },
    })

    const button = wrapper.find('button.cart-btn')
    await button.trigger('click')

    expect(tryAddToCartMock).toHaveBeenCalledWith(expect.anything(), mockMovie)
  })

  it('chama removeFavorite quando botão de remover é clicado', async () => {
    const wrapper = mount(FavoritesSidebar, {
      props: { open: true },
      global: { plugins: [store] },
    })

    const button = wrapper.find('button.remove-btn')
    await button.trigger('click')

    expect(removeFavoriteMock).toHaveBeenCalledWith(expect.anything(), mockMovie.id)
  })

  it('chama clearFavorites ao clicar em "Esvaziar"', async () => {
    const wrapper = mount(FavoritesSidebar, {
      props: { open: true },
      global: { plugins: [store] },
    })

    const button = wrapper.find('button.clear-btn')
    await button.trigger('click')

    expect(clearFavoritesMock).toHaveBeenCalled()
  })

  it('exibe mensagem de vazio quando não há favoritos', () => {
    store = createMockStore([])

    const wrapper = mount(FavoritesSidebar, {
      props: { open: true },
      global: { plugins: [store] },
    })

    expect(wrapper.text()).toContain('Nenhum filme favorito')
  })
})
