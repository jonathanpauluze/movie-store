import { createStore } from 'vuex'
import cartModule from '@/store/modules/cart'
import * as getPriceModule from '@/utils/getPrice'
import { describe, it, expect, beforeEach, vi } from 'vitest'

const mockMovie = {
  id: 101,
  title: 'Filme Teste',
  genre_ids: [1, 2],
  release_date: '2023-01-01',
  vote_average: 7.5,
  vote_count: 1000,
  poster_path: '/poster.jpg',
}

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
})
