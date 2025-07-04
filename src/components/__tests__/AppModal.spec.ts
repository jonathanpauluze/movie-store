import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AppModal from '@/components/AppModal.vue'

let wrapper: ReturnType<typeof mount>

function mountModal(visible = true) {
  return mount(AppModal, {
    props: { visible },
    slots: {
      default: '<p>Conteúdo do Modal</p>',
    },
    global: {
      stubs: {
        Teleport: true,
      },
    },
  })
}

describe('AppModal.vue', () => {
  beforeEach(() => {
    wrapper = mountModal()
  })

  it('renderiza o conteúdo do slot quando visível', async () => {
    const modal = wrapper.find('.modal-content')
    expect(modal.exists()).toBe(true)
    expect(modal).not.toBeNull()
    expect(modal.text()).toContain('Conteúdo do Modal')
  })

  it('não renderiza o modal quando `visible` é false', async () => {
    wrapper = mountModal(false)
    await nextTick()

    expect(wrapper.find('.modal-backdrop').exists()).toBe(false)
    expect(wrapper.find('.modal-content').exists()).toBe(false)
  })

  it('emite evento `close` ao clicar no backdrop', async () => {
    const backdrop = wrapper.find('.modal-backdrop')
    expect(backdrop).not.toBeNull()

    backdrop.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('não emite `close` ao clicar dentro do modal', async () => {
    const content = wrapper.find('.modal-content')
    expect(content).not.toBeNull()

    content.trigger('click')

    expect(wrapper.emitted('close')).toBeFalsy()
  })
})
