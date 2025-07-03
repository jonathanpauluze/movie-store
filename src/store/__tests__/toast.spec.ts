import { vi, describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import toastModule from '@/store/modules/toast'

vi.useFakeTimers()

describe('toast Vuex module', () => {
  let store: ReturnType<typeof createStore>

  beforeEach(() => {
    store = createStore({
      modules: {
        toast: {
          ...toastModule,
          namespaced: true,
        },
      },
    })
  })

  it('adiciona um toast com message e type', () => {
    store.dispatch('toast/showToast', { message: 'Item adicionado', type: 'success' })

    const toasts = store.state.toast.toasts
    expect(toasts).toHaveLength(1)
    expect(toasts[0]).toMatchObject({
      message: 'Item adicionado',
      type: 'success',
    })
  })

  it('remove o toast após 3 segundos', () => {
    store.dispatch('toast/showToast', { message: 'Item adicionado' })

    expect(store.state.toast.toasts).toHaveLength(1)

    vi.advanceTimersByTime(3000)

    expect(store.state.toast.toasts).toHaveLength(0)
  })

  it('exibe a quantidade de toasts correta', () => {
    store.dispatch('toast/showToast', { message: 'Toast 1' })
    store.dispatch('toast/showToast', { message: 'Toast 2' })
    store.dispatch('toast/showToast', { message: 'Toast 3' })
    store.dispatch('toast/showToast', { message: 'Toast 4' })

    const toasts = store.state.toast.toasts
    expect(toasts).toHaveLength(4)
  })

  it('incrementa o id a cada toast', () => {
    store.dispatch('toast/showToast', { message: 'Toast 1' })
    store.dispatch('toast/showToast', { message: 'Toast 2' })

    const toasts = store.state.toast.toasts
    expect(toasts[0].id).toBe(0)
    expect(toasts[1].id).toBe(1)
  })
})
