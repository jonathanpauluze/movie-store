import { onMounted, onUnmounted } from 'vue'

export function useInfiniteScroll(callback: () => void, offset = 100) {
  function handleScroll() {
    const scrollBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - offset
    if (scrollBottom) callback()
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
}
