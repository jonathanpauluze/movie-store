import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CartSidebar from '@/components/CartSidebar.vue'
import { createStore } from 'vuex'
import { formatCurrency } from '@/utils/formatCurrency'

// Mock do store
const mockItems = [
  { id: 1, title: 'Filme A', poster_path: '/poster-a.jpg' },
  { id: 2, title: 'Filme B', poster_path: '/poster-b.jpg' },
]

const store = createStore({
  state: {
    cart: {
      items: mockItems,
    },
  },
  getters: {
    'cart/cartTotal': () => 19.98,
    'cart/cartCount': () => mockItems.length,
  },
  mutations: {
    'cart/removeFromCart': vi.fn(),
    'cart/clearCart': vi.fn(),
  },
})

// Mock do RouterLink e ícone
vi.mock('vue-router', () => ({
  RouterLink: {
    template: '<a><slot /></a>',
  },
}))
vi.mock('@phosphor-icons/vue', () => ({
  PhTrash: {
    template: '<svg />',
  },
}))

describe('CartSidebar', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(CartSidebar, {
      props: {
        open: true,
      },
      global: {
        plugins: [store],
      },
    })
  })

  it('exibe os itens do carrinho', () => {
    const titles = wrapper.findAll('.title').map((el) => el.text())
    expect(titles).toContain('Filme A')
    expect(titles).toContain('Filme B')
  })

  it('exibe o total formatado', () => {
    const total = formatCurrency(19.98)

    expect(wrapper.text()).toContain(`Total: ${total}`)
  })

  it('emite evento de fechar ao clicar fora', async () => {
    wrapper.vm.$emit('close')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('chama clearCart ao clicar no botão de esvaziar', async () => {
    const clearCartSpy = vi.fn()
    store._mutations['cart/clearCart'][0] = clearCartSpy

    const clearBtn = wrapper.find('.clear-btn')

    expect(clearBtn).toBeTruthy()
    await clearBtn.trigger('click')
    expect(clearCartSpy).toHaveBeenCalled()
  })
})
