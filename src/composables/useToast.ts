import { ref } from 'vue'

type Toast = {
  id: number
  message: string
  type?: 'success' | 'error' | 'info'
}

type ShowToastParams = {
  message: string
  type?: Toast['type']
  duration?: number
}

const toasts = ref<Toast[]>([])
let idCounter = 0

export function useToast() {
  const showToast = (params: ShowToastParams) => {
    const { message, type = 'info', duration = 3000 } = params

    const id = idCounter++
    toasts.value.push({ id, message, type })

    setTimeout(() => {
      toasts.value = toasts.value.filter((toast) => toast.id !== id)
    }, duration)
  }

  return {
    toasts,
    showToast,
  }
}
