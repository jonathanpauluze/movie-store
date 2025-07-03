import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSidebar from '@/components/AppSidebar.vue'

describe('AppSidebar', () => {
  it('não renderiza quando open é false', () => {
    const wrapper = mount(AppSidebar, {
      props: { open: false },
      slots: { default: '<p>Conteúdo do sidebar</p>' },
    })
    expect(wrapper.find('.sidebar').exists()).toBe(false)
  })

  it('renderiza corretamente quando open é true', () => {
    const wrapper = mount(AppSidebar, {
      props: { open: true },
      slots: { default: '<p>Conteúdo do sidebar</p>' },
    })
    expect(wrapper.find('.sidebar').exists()).toBe(true)
    expect(wrapper.text()).toContain('Conteúdo do sidebar')
  })

  it('emite "close" ao clicar fora do sidebar', async () => {
    const wrapper = mount(AppSidebar, {
      props: { open: true },
      attachTo: document.body,
    })

    await wrapper.find('.backdrop').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emite "close" ao pressionar ESC', async () => {
    const wrapper = mount(AppSidebar, {
      props: { open: true },
      attachTo: document.body,
    })

    const escEvent = new KeyboardEvent('keydown', { key: 'Escape' })
    window.dispatchEvent(escEvent)

    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
