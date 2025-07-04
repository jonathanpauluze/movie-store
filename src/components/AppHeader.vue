<script setup lang="ts">
import { ref, watch } from 'vue'
import SearchBar from './SearchBar.vue'
import { PhHeart, PhShoppingCart } from '@phosphor-icons/vue'

const emit = defineEmits(['toggle-cart', 'toggle-favorites', 'search'])

const searchQuery = ref('')

watch(searchQuery, (value) => {
  emit('search', value)
})

const toggleCart = () => {
  emit('toggle-cart')
}

const toggleFavorites = () => {
  emit('toggle-favorites')
}
</script>

<template>
  <header class="header">
    <div class="logo">LOGO</div>

    <div class="search">
      <SearchBar v-model="searchQuery" />
    </div>

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
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--color-background-soft);
  border-bottom: 1px solid var(--color-border);
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
  order: 1;
  flex-shrink: 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
  order: 2;
  flex-shrink: 0;

  button {
    background: transparent;
    border: none;
    cursor: pointer;
    color: var(--color-text);
  }
}

.search {
  flex: 1 1 100%;
  order: 3;

  input {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .search {
    order: 2;
    flex: 1 1 auto;
    max-width: 400px;
  }

  .actions {
    order: 3;
  }
}
</style>
