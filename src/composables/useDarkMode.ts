import { ref, watchEffect } from 'vue'

const THEME_KEY = '@app/theme'
const isDark = ref(false)

function loadInitialTheme() {
  const saved = localStorage.getItem(THEME_KEY)

  if (saved === 'dark') {
    isDark.value = true
  } else if (saved === 'light') {
    isDark.value = false
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}

loadInitialTheme()

watchEffect(() => {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
    html.classList.remove('light')
    localStorage.setItem(THEME_KEY, 'dark')
  } else {
    html.classList.add('light')
    html.classList.remove('dark')
    localStorage.setItem(THEME_KEY, 'light')
  }
})

export function useDarkMode() {
  return {
    isDark,
    toggleDark: () => {
      isDark.value = !isDark.value
    },
  }
}
