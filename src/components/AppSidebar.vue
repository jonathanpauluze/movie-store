<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { useTrapFocus } from '@/composables/useTrapFocus'
import { useEscapeToClose } from '@/composables/useEscapeToClose'

type PropsType = {
  open: boolean
  side?: 'left' | 'right'
}
const props = withDefaults(defineProps<PropsType>(), {
  open: false,
  side: 'right',
})

type EmitType = (event: 'close') => void
const emit = defineEmits<EmitType>()

const sidebarRef = ref<HTMLElement | null>(null)

function handleClickOutside(event: MouseEvent) {
  if (props.open && sidebarRef.value && !sidebarRef.value.contains(event.target as Node)) {
    emit('close')
  }
}

useTrapFocus(
  () => sidebarRef.value,
  () => props.open,
)

useEscapeToClose(
  () => emit('close'),
  () => props.open,
)

watch(
  () => props.open,
  async (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open && sidebarRef.value) {
      await nextTick()
      const focusable = sidebarRef.value.querySelector<HTMLElement>(
        'a, button:not(:disabled), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      )
      focusable?.focus()
    }
  },
)

onMounted(() => {
  window.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('mousedown', handleClickOutside)
  document.body.style.overflow = ''
})
</script>

<template>
  <transition name="fade">
    <div v-if="open" class="backdrop" @click.self="emit('close')" />
  </transition>

  <transition :name="`slide-${side}`">
    <aside
      v-if="open"
      class="sidebar"
      :class="side"
      ref="sidebarRef"
      role="dialog"
      aria-modal="true"
    >
      <slot />
    </aside>
  </transition>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-backdrop);
  z-index: 999;
}

.sidebar {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  height: 100vh;
  width: 85%;
  background-color: var(--color-background-soft);
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  z-index: 1000;

  @media (min-width: 768px) {
    width: 350px;
  }

  &.right {
    right: 0;
  }

  &.left {
    left: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
}
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}
.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}
</style>
