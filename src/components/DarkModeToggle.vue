<script setup lang="ts">
import { PhMoon, PhSun } from '@phosphor-icons/vue'
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>

<template>
  <label
    class="switch"
    role="switch"
    :aria-checked="isDark"
    :aria-label="isDark ? 'Modo claro' : 'Modo escuro'"
  >
    <PhSun class="icon sun" aria-hidden="true" />

    <input type="checkbox" :checked="isDark" @change="toggleDark" />

    <span class="slider" aria-hidden="true" />

    <PhMoon class="icon moon" aria-hidden="true" />
  </label>
</template>

<style scoped>
.switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 70px;
  height: 32px;
  user-select: none;
  cursor: pointer;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.slider {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background-color: var(--color-border);
  transition: background-color 0.3s;
}

.slider::before {
  content: '';
  position: absolute;
  height: 24px;
  width: 24px;
  left: 4px;
  top: 4px;
  background-color: var(--color-background);
  border-radius: 50%;
  transition: 0.3s;
  box-shadow: 0 0 2px var(--color-shadow);
}

/* Checked styles */
input:checked + .slider {
  /* background-color: var(--color-primary); */

  &::before {
    background-color: var(--color-primary);
  }
}

input:checked + .slider::before {
  transform: translateX(36px);
}

input:focus-visible + .slider {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.icon {
  position: relative;
  z-index: 2;
  color: var(--color-text-light);
  font-size: 16px;
}

.sun {
  margin-right: auto;
  margin-left: 8px;
}

.moon {
  margin-left: auto;
  margin-right: 10px;
}
</style>
