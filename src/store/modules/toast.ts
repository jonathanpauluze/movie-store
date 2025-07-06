import type { Module } from 'vuex/types/index.d.ts' // Importar de vuex está causando erro

type Toast = {
  id: number
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

export interface ToastState {
  toasts: Toast[]
  idCounter: number
}

const toastModule: Module<ToastState, unknown> = {
  namespaced: true,

  state: () => ({
    toasts: [],
    idCounter: 0,
  }),

  mutations: {
    ADD_TOAST(state, toast: Omit<Toast, 'id'>) {
      const id = state.idCounter++
      state.toasts.push({ ...toast, id })

      setTimeout(() => {
        const index = state.toasts.findIndex((t) => t.id === id)
        if (index !== -1) state.toasts.splice(index, 1)
      }, 5000)
    },
  },

  actions: {
    showToast({ commit }, payload: { message: string; type?: Toast['type'] }) {
      commit('ADD_TOAST', payload)
    },
  },
}

export default toastModule
