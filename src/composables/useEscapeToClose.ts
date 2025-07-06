import { onMounted, onUnmounted } from 'vue'

export function useEscapeToClose(callback: () => void, shouldListen: () => boolean = () => true) {
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && shouldListen()) {
      callback()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
  })
}
