import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import AppToast from '@/components/AppToast.vue'

describe('AppToast.vue', () => {
  const mockToasts = [
    { id: 1, message: 'Success message', type: 'success' },
    { id: 2, message: 'Error message', type: 'error' },
    { id: 3, message: 'Info message', type: 'info' },
  ]

  const store = createStore({
    state: {
      toast: {
        toasts: mockToasts,
      },
    },
  })

  it('renders all toasts from the store', () => {
    const wrapper = mount(AppToast, {
      global: {
        plugins: [store],
      },
    })

    const toastElements = wrapper.findAll('.toast')
    expect(toastElements.length).toBe(mockToasts.length)

    toastElements.forEach((el, i) => {
      expect(el.text()).toContain(mockToasts[i].message)
      expect(el.classes()).toContain(mockToasts[i].type)
    })
  })
})
