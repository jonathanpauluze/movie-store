import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MovieCard from '@/components/MovieCard.vue'
import type { Movie } from '@/types/movie'

const mockMovie: Movie = {
  id: 1,
  title: 'The Test Movie - A Journey Begins',
  release_date: '2025-07-03',
  vote_average: 8.5,
  vote_count: 1000,
  poster_path: '/poster.jpg',
  genre_ids: [28, 12],
}

vi.mock('@/composables/useGenres', () => ({
  useGenres: () => ({
    resolve: () => ['Ação', 'Aventura'],
  }),
}))

describe('MovieCard', () => {
  it('renderiza o título do filme', () => {
    const wrapper = mount(MovieCard, {
      props: { movie: mockMovie },
    })

    expect(wrapper.text()).toContain('The Test Movie - A Journey Begins')
  })

  it('exibe o botão de adicionar', () => {
    const wrapper = mount(MovieCard, {
      props: { movie: mockMovie },
    })

    expect(wrapper.find('button').text()).toContain('Adicionar')
  })

  it('emite evento ao clicar no botão', async () => {
    const wrapper = mount(MovieCard, {
      props: { movie: mockMovie },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted()['add-to-cart']).toBeTruthy()
  })
})
