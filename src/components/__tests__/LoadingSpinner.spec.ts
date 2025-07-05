import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

describe('LoadingSpinner.vue', () => {
  it('renderiza o loading corretamente', () => {
    const wrapper = mount(LoadingSpinner)

    expect(wrapper.find('.loading-wrapper p').text()).toBe('Carregando...')
  })

  it('renderiza corretamente texto do loading', () => {
    const wrapper = mount(LoadingSpinner, {
      props: {
        text: 'Carregando componentes',
      },
    })

    expect(wrapper.find('.loading-wrapper p').text()).toBe('Carregando componentes')
  })
})
