import { vi, describe, it, expect, beforeEach } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import cartModule from '@/store/modules/cart'
import favoritesModule from '@/store/modules/favorites'
import AppHeader from '@/components/AppHeader.vue'

vi.mock('vue-router', () => ({
  RouterLink: {
    template: '<a><slot /></a>',
  },
}))
vi.mock('@/composables/useDarkMode', () => ({
  useDarkMode: () => ({
    isDark: ref(false),
    toggleDark: vi.fn(),
  }),
}))

describe('Header.vue', () => {
  let store: ReturnType<typeof createStore>
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    store = createStore({
      modules: {
        cart: {
          ...cartModule,
          namespaced: true,
        },
        favorites: {
          ...favoritesModule,
          namespaced: true,
        },
      },
    })

    wrapper = mount(AppHeader, {
      global: {
        plugins: [store],
      },
    })
  })

  it('renderiza o logo', () => {
    expect(wrapper.find('.logo').text()).toBe('MovieStore')
  })

  it('renderiza os botões de favoritos e carrinho', () => {
    const buttons = wrapper.findAll('button')

    expect(buttons).toHaveLength(2)
    expect(buttons[0].attributes('aria-label')).toBe('Favoritos')
    expect(buttons[1].attributes('aria-label')).toBe('Carrinho')
  })

  it('emite "toggle-favorites" ao clicar no botão de favoritos', async () => {
    await wrapper.find('button[aria-label="Favoritos"]').trigger('click')

    expect(wrapper.emitted('toggle-favorites')).toBeTruthy()
  })

  it('emite "toggle-cart" ao clicar no botão de carrinho', async () => {
    await wrapper.find('button[aria-label="Carrinho"]').trigger('click')

    expect(wrapper.emitted('toggle-cart')).toBeTruthy()
  })
})
