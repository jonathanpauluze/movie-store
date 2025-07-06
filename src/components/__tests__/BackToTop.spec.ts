import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import BackToTop from '@/components/BackToTop.vue'

describe('BackToTop.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(BackToTop)
    window.scrollY = 0
    window.scrollTo = vi.fn()
  })

  it('não renderiza o botão inicialmente', () => {
    const button = wrapper.find('.back-to-top')

    expect(button.exists()).toBe(false)
  })

  it('mostra o botão quando scrollY for maior que 400', async () => {
    window.scrollY = 500
    window.dispatchEvent(new Event('scroll'))

    await wrapper.vm.$nextTick()

    const button = wrapper.find('.back-to-top')

    expect(button.exists()).toBe(true)
  })

  it('chama window.scrollTo ao clicar', async () => {
    window.scrollY = 500
    window.dispatchEvent(new Event('scroll'))

    await wrapper.vm.$nextTick()

    const button = wrapper.find('.back-to-top')
    await button.trigger('click')

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('possui o atributo aria-label para acessibilidade', async () => {
    window.scrollY = 500
    window.dispatchEvent(new Event('scroll'))
    await wrapper.vm.$nextTick()

    const button = wrapper.find('.back-to-top')

    expect(button.attributes('aria-label')).toBe('Voltar ao topo')
  })
})
