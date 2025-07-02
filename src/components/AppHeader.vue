<script setup lang="ts">
import SearchBar from './SearchBar.vue'
import { PhHeart, PhShoppingCart } from '@phosphor-icons/vue'

const toggleCart = () => {
  console.log('Abrir carrinho')
}
const toggleFavorites = () => {
  console.log('Abrir favoritos')
}
</script>

<template>
  <header class="header">
    <div class="logo">LOGO</div>

    <SearchBar />

    <div class="actions">
      <button aria-label="Favoritos" @click="toggleFavorites">
        <PhHeart weight="fill" size="24" />
      </button>

      <button aria-label="Carrinho" @click="toggleCart">
        <PhShoppingCart weight="fill" size="24" />
      </button>
    </div>
  </header>
</template>

<style scoped scss>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    padding: 0.5rem 0.75rem;
    border: 0;
    border-radius: 0.25rem;
    background-color: transparent;
    color: var(--color-text);
    cursor: pointer;
  }
}
</style>
