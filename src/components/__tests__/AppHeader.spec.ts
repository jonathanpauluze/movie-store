import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader.vue'

describe('Header.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(AppHeader)
  })

  it('renderiza o logo', () => {
    expect(wrapper.find('.logo').text()).toBe('LOGO')
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
