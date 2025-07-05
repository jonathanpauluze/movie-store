<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { PhArrowUp } from '@phosphor-icons/vue'

const showButton = ref(false)

function checkScroll() {
  showButton.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <transition name="fade">
    <button v-if="showButton" class="back-to-top" aria-label="Voltar ao topo" @click="scrollToTop">
      <PhArrowUp :size="18" />
    </button>
  </transition>
</template>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  font-size: 1.5rem;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;
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

.back-to-top:hover {
  background-color: var(--color-primary-hover);
}
</style>
