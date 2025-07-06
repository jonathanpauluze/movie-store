<template>
  <div class="toast-container">
    <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const toasts = computed(() => store.state.toast.toasts)
</script>

<style scoped scss>
.toast-container {
  width: 90%;
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 9999;

  @media (min-width: 768px) {
    width: 350px;
  }
}

.toast {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  color: var(--white);
  font-weight: 500;
  box-shadow: 0 2px 6px var(--color-shadow);
  animation: fade-in-out 5s ease forwards;

  &.success {
    background-color: var(--color-success);
  }

  &.error {
    background-color: var(--color-danger);
  }

  &.warning {
    background-color: var(--color-warning);
  }

  &.info {
    background-color: var(--color-info);
  }
}

@keyframes fade-in-out {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  10%,
  90% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
