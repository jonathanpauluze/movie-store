import { onMounted, onUnmounted } from 'vue'

export function useTrapFocus(
  containerRef: () => HTMLElement | null,
  isActive: () => boolean = () => true,
) {
  function handleTrapFocus(event: KeyboardEvent) {
    if (event.key !== 'Tab' || !isActive() || !containerRef()) return

    const focusables = containerRef()!.querySelectorAll<HTMLElement>(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )

    if (!focusables.length) return

    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleTrapFocus)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleTrapFocus)
  })
}
