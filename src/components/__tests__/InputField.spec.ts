import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import InputField from '@/components/form/InputField.vue'

const baseProps = {
  modelValue: '',
  label: 'Nome',
  name: 'name',
  placeholder: 'Digite seu nome',
}

function createValidationMock({ invalid = false, touched = false, message = '' } = {}) {
  return {
    $invalid: invalid,
    $dirty: touched,
    $touch: vi.fn(),
    $errors: invalid ? [{ $message: message || 'Campo obrigatório' }] : [],
  }
}

describe('InputField.vue', () => {
  it('renderiza o label e placeholder corretamente', () => {
    const wrapper = mount(InputField, {
      props: baseProps,
    })

    expect(wrapper.find('label').text()).toBe('Nome')
    expect(wrapper.find('input').attributes('placeholder')).toBe('Digite seu nome')
  })

  it('emite update:modelValue ao digitar', async () => {
    const wrapper = mount(InputField, {
      props: baseProps,
    })

    const input = wrapper.find('input')
    await input.setValue('Jonathan')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Jonathan'])
  })

  it('exibe mensagem de erro quando inválido e tocado', () => {
    const wrapper = mount(InputField, {
      props: {
        ...baseProps,
        validation: createValidationMock({ invalid: true, touched: true }),
      },
    })

    expect(wrapper.find('.input-error').exists()).toBe(true)
    expect(wrapper.find('.input-error').text()).toBe('Campo obrigatório')
  })

  it('chama $touch no blur', async () => {
    const validationMock = createValidationMock()
    const wrapper = mount(InputField, {
      props: {
        ...baseProps,
        validation: validationMock,
      },
    })

    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(validationMock.$touch).toHaveBeenCalled()
  })
})
