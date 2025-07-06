import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppButton from '@/components/AppButton.vue'

describe('AppButton', () => {
  it('renderiza o conteúdo do slot', () => {
    const wrapper = mount(AppButton, {
      slots: {
        default: 'Clique aqui',
      },
    })
    expect(wrapper.text()).toBe('Clique aqui')
  })

  it('aplica classes de variante, tamanho e fullWidth', () => {
    const wrapper = mount(AppButton, {
      props: {
        variant: 'outline',
        size: 'lg',
        fullWidth: true,
      },
    })
    expect(wrapper.classes()).toContain('btn')
    expect(wrapper.classes()).toContain('outline')
    expect(wrapper.classes()).toContain('lg')
    expect(wrapper.classes()).toContain('full-width')
  })

  it('usa o type correto', () => {
    const wrapper = mount(AppButton, {
      props: {
        type: 'submit',
      },
    })
    expect(wrapper.attributes('type')).toBe('submit')
  })

  it('emite evento de clique', async () => {
    const wrapper = mount(AppButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })
})
