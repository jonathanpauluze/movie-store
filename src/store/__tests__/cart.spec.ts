import { createStore } from 'vuex'
import cartModule from '@/store/modules/cart'
import * as getPriceModule from '@/utils/getPrice'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { Movie } from '@/types/movie'
import type { RootState } from '../types'
import type { ActionContext } from 'vuex/types/index.js'

const mockMovie: Movie = {
  id: 101,
  title: 'Filme Teste',
  original_title: 'Filme Teste',
  genre_ids: [1, 2],
  release_date: '2023-01-01',
  vote_average: 7.5,
  vote_count: 1000,
  poster_path: '/poster.jpg',
  backdrop_path: '/poster.jpg',
  adult: false,
}

vi.mock('@/utils/localStorage', () => ({
  loadFromStorage: () => [],
  saveToStorage: vi.fn(),
}))

describe('cart Vuex module', () => {
  let store: ReturnType<typeof createStore>

  beforeEach(() => {
    store = createStore({
      modules: {
        cart: {
          ...cartModule,
          namespaced: true,
        },
      },
    })
  })

  it('adiciona um item ao carrinho', () => {
    store.commit('cart/addToCart', mockMovie)

    expect(store.state.cart.items).toHaveLength(1)
    expect(store.state.cart.items[0]).toEqual(mockMovie)
  })

  it('não adiciona o mesmo item duas vezes', () => {
    store.commit('cart/addToCart', mockMovie)
    store.commit('cart/addToCart', mockMovie)

    expect(store.state.cart.items).toHaveLength(1)
  })

  it('remove um item do carrinho', () => {
    store.commit('cart/addToCart', mockMovie)
    expect(store.state.cart.items).toHaveLength(1)

    store.commit('cart/removeFromCart', mockMovie.id)
    expect(store.state.cart.items).toHaveLength(0)
  })

  it('esvazia o carrinho', () => {
    const secondMovie = { ...mockMovie, id: 202 }

    store.commit('cart/addToCart', mockMovie)
    expect(store.state.cart.items).toHaveLength(1)

    store.commit('cart/addToCart', secondMovie)
    expect(store.state.cart.items).toHaveLength(2)

    store.commit('cart/clearCart')
    expect(store.state.cart.items).toHaveLength(0)
  })

  it('calcula o total corretamente com getPrice()', () => {
    const secondMovie = { ...mockMovie, id: 202 }
    const spy = vi.spyOn(getPriceModule, 'getPrice')

    store.commit('cart/addToCart', mockMovie)
    store.commit('cart/addToCart', secondMovie)

    const expectedTotal =
      getPriceModule.getPrice(mockMovie.id) + getPriceModule.getPrice(secondMovie.id)

    expect(store.getters['cart/cartTotal']).toBe(expectedTotal)
    expect(spy).toHaveBeenCalledWith(mockMovie.id)
    expect(spy).toHaveBeenCalledWith(secondMovie.id)
  })

  it('retorna a contagem correta de itens', () => {
    store.commit('cart/addToCart', mockMovie)
    store.commit('cart/addToCart', { ...mockMovie, id: 202 })

    const count = store.getters['cart/cartCount']
    expect(count).toBe(2)
  })

  it('tryAddToCart dispatch mostra warning se o item já estiver no carrinho', () => {
    const dispatch = vi.fn()
    const commit = vi.fn()

    const state = {
      items: [mockMovie],
    }

    const context = {
      state,
      commit,
      dispatch,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    } as ActionContext<typeof state, RootState>

    cartModule.actions.tryAddToCart(context, mockMovie)

    expect(commit).not.toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(
      'toast/showToast',
      expect.objectContaining({
        message: `"${mockMovie.title}" já está no carrinho.`,
        type: 'warning',
      }),
      { root: true },
    )
  })

  it('tryAddToCart adiciona e mostra success se o item não estiver no carrinho', () => {
    const dispatch = vi.fn()
    const commit = vi.fn()

    const state = {
      items: [],
    }

    const context = {
      state,
      commit,
      dispatch,
      getters: {},
      rootState: {} as RootState,
      rootGetters: {},
    } as ActionContext<typeof state, RootState>

    cartModule.actions.tryAddToCart(context, mockMovie)

    expect(commit).toHaveBeenCalledWith('addToCart', mockMovie)
    expect(dispatch).toHaveBeenCalledWith(
      'toast/showToast',
      expect.objectContaining({
        message: `"${mockMovie.title}" adicionado ao carrinho!`,
        type: 'success',
      }),
      { root: true },
    )
  })

  it('isInCart retorna true se o item estiver no carrinho', () => {
    const state = {
      items: [mockMovie],
    }

    const result = cartModule.getters.isInCart(state)(mockMovie.id)
    expect(result).toBe(true)
  })

  it('isInCart retorna false se o item NÃO estiver no carrinho', () => {
    const state = {
      items: [],
    }

    const result = cartModule.getters.isInCart(state)(mockMovie.id)
    expect(result).toBe(false)
  })
})
