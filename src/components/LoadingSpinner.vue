<script setup lang="ts">
import { PhSpinner } from '@phosphor-icons/vue'
type PropTypes = {
  text?: string
}

withDefaults(defineProps<PropTypes>(), {
  text: 'Carregando...',
})
</script>

<template>
  <div class="loading-wrapper">
    <PhSpinner :size="32" />
    <p>{{ text }}</p>
  </div>
</template>

<style scoped scss>
.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-light);

  svg {
    animation: spin 1.5s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
