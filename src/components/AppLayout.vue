<script setup lang="ts">
import AppHeader from './AppHeader.vue'
</script>

<template>
  <div>
    <AppHeader />
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}
</style>
