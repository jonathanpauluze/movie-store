<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import CartSidebar from './CartSidebar.vue'
import FavoritesSidebar from './FavoritesSidebar.vue'
import { ref } from 'vue'

const isCartOpen = ref(false)
const isFavoritesOpen = ref(false)
</script>

<template>
  <div>
    <AppHeader @toggle-cart="isCartOpen = true" @toggle-favorites="isFavoritesOpen = true" />

    <CartSidebar :open="isCartOpen" @close="isCartOpen = false" />
    <FavoritesSidebar :open="isFavoritesOpen" @close="isFavoritesOpen = false" />

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
