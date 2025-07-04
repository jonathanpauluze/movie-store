<script setup lang="ts">
type PropsType = { visible: boolean }
defineProps<PropsType>()

defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <transition name="modal-fade-slide">
      <div v-if="visible" class="modal-backdrop" @click.self="$emit('close')">
        <div class="modal-content">
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
  padding: 2rem;
  margin: 1rem;
  width: 100%;
  max-width: 400px;
  transform: translateY(100px);
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
