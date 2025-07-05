<script setup lang="ts">
import { onUnmounted, ref, nextTick } from 'vue'
import { useTrapFocus } from '@/composables/useTrapFocus'
import { useEscapeToClose } from '@/composables/useEscapeToClose'

type PropsType = { open: boolean; closable?: boolean }
const props = withDefaults(defineProps<PropsType>(), {
  closable: true,
})

const emit = defineEmits(['close'])

const modalRef = ref<HTMLElement | null>(null)

function onAfterEnter() {
  nextTick(() => {
    const focusable = modalRef.value?.querySelector<HTMLElement>(
      'a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    )
    focusable?.focus()
  })
}

function handleBackdropClick() {
  if (props.closable) {
    emit('close')
  }
}

useTrapFocus(
  () => modalRef.value,
  () => props.open,
)

useEscapeToClose(
  () => emit('close'),
  () => props.open && props.closable,
)

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <transition name="modal-fade-slide" @after-enter="onAfterEnter">
      <div v-if="open" class="modal-backdrop" @click.self="handleBackdropClick">
        <div class="modal-content" ref="modalRef" role="dialog" aria-modal="true">
          <slot />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: var(--color-backdrop);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background-color: var(--color-background-soft);
  border-radius: 8px;
  margin: 1rem;
  width: 100%;
  max-width: 400px;
  transform: translateY(100px);
  overflow: hidden;
  animation: slide-up 0.4s ease-out forwards;
}

.modal-fade-slide-enter-active,
.modal-fade-slide-leave-active {
  transition: opacity 0.4s ease;
}

.modal-fade-slide-enter-from,
.modal-fade-slide-leave-to {
  opacity: 0;
}

@keyframes slide-up {
  to {
    transform: translateY(0);
  }
}
</style>
