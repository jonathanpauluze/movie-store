import { vi, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CheckoutSuccessModal from '@/components/CheckoutSuccessModal.vue'

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
    props: ['fullWidth'],
  },
}))

describe('CheckoutSuccessModal.vue', () => {
  const factory = (props = { open: true, name: 'Jonathan' }) => {
    return mount(CheckoutSuccessModal, {
      props,
    })
  }

  it('renderiza o modal com nome do usuário', () => {
    const wrapper = factory()
    expect(wrapper.text()).toContain('Obrigado Jonathan!')
    expect(wrapper.text()).toContain('Sua compra foi finalizada com sucesso!')
  })

  it('emite "close" quando botão é clicado', async () => {
    const wrapper = factory()
    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emite "close" quando AppModal emite close', async () => {
    const wrapper = factory()

    await wrapper.findComponent({ name: 'AppModal' }).vm.$emit('close')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('não renderiza conteúdo se open for false', () => {
    const wrapper = factory({ open: false, name: 'Jonathan' })

    expect(wrapper.find('.modal').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Obrigado')
  })
})
