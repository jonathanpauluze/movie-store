import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieDetailsModal from '@/components/MovieDetailsModal.vue'
import type { Movie } from '@/types/movie'

vi.mock('@/components/AppModal.vue', () => ({
  default: {
    name: 'AppModal',
    props: ['open', 'closable'],
    emits: ['close'],
    template: `
      <div v-if="open" class="modal"><slot /></div>
    `,
  },
}))

vi.mock('@/components/AppButton.vue', () => ({
  default: {
    name: 'AppButton',
    template: '<button @click="$emit(\'click\')"><slot /></button>',
    props: ['disabled', 'fullWidth'],
  },
}))

vi.mock('@phosphor-icons/vue', () => ({
  PhTag: { template: '<span>icon</span>' },
  PhGlobe: { template: '<span>icon</span>' },
  PhCalendarBlank: { template: '<span>icon</span>' },
  PhStar: { template: '<span>icon</span>' },
  PhX: { template: '<span>icon</span>' },
}))

vi.mock('@/composables/useGenres', () => ({
  useGenres: () => ({
    resolve: (ids: number[]) => ids.map((id) => `Gênero ${id}`),
  }),
}))

vi.mock('@/utils/date', () => ({
  formatDate: (date: string) => `Formatado: ${date}`,
}))

const dispatch = vi.fn()
const storeMock = {
  getters: {
    'cart/isInCart': vi.fn(() => false),
  },
  dispatch,
}

vi.mock('@/store', () => ({
  useStore: () => storeMock,
}))

const mockMovie: Movie = {
  id: 1,
  adult: false,
  title: 'The Test Movie - A Journey Begins',
  original_title: 'The Test Movie - A Journey Begins Original Title',
  release_date: '2025-07-03',
  vote_average: 8.5,
  vote_count: 1000,
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  genre_ids: [1, 2],
}

describe('MovieDetailsModal.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    storeMock.getters['cart/isInCart'] = vi.fn(() => false)
  })

  it('renderiza os dados do filme corretamente', () => {
    const wrapper = mount(MovieDetailsModal, {
      props: { open: true, movie: mockMovie },
    })

    expect(wrapper.text()).toContain('The Test Movie - A Journey Begins')
    expect(wrapper.text()).toContain('Gênero 1, Gênero 2')
    expect(wrapper.text()).toContain('The Test Movie - A Journey Begins Original Title')
    expect(wrapper.text()).toContain('Formatado: 2025-07-03')
    expect(wrapper.text()).toContain('8.5')
    expect(wrapper.text()).toContain('Adicionar ao carrinho')
  })

  it('exibe "Adicionado" se já estiver no carrinho', () => {
    storeMock.getters['cart/isInCart'] = vi.fn(() => true)

    const wrapper = mount(MovieDetailsModal, {
      props: { open: true, movie: mockMovie },
    })

    expect(wrapper.text()).toContain('Adicionado ao carrinho')

    // forma alternativa usando prop
    const button = wrapper.findComponent({ name: 'AppButton' })
    expect(button.props('disabled')).toBe(true)
  })

  it('dispara addToCart e emite close ao clicar no botão', async () => {
    const wrapper = mount(MovieDetailsModal, {
      props: {
        open: true,
        movie: mockMovie,
      },
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(dispatch).toHaveBeenCalledWith('cart/tryAddToCart', mockMovie)
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emite "close" ao clicar no botão de fechar', async () => {
    const wrapper = mount(MovieDetailsModal, {
      props: { open: true, movie: mockMovie },
    })

    const closeButton = wrapper.find('button[aria-label="Fechar"]')
    await closeButton.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
