<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { PhHeart, PhShoppingCart } from '@phosphor-icons/vue'
import { useStore } from '@/store'
import SearchBar from './SearchBar.vue'
import DarkModeToggle from './DarkModeToggle.vue'

const emit = defineEmits(['toggle-cart', 'toggle-favorites', 'search'])

const store = useStore()
const searchQuery = ref('')
const cartCount = computed(() => store.getters['cart/cartCount'])
const favoritesCount = computed(() => store.getters['favorites/favoritesCount'])
const cartCountText = computed(() => (cartCount.value > 9 ? '9+' : cartCount.value))
const favoritesCountText = computed(() => (favoritesCount.value > 9 ? '9+' : favoritesCount.value))

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
    <div class="logo">
      <RouterLink to="/">MovieStore</RouterLink>
    </div>

    <div class="search">
      <SearchBar v-model="searchQuery" />
    </div>

    <div class="actions">
      <DarkModeToggle />

      <button class="favorites-btn" aria-label="Favoritos" @click="toggleFavorites">
        <PhHeart weight="fill" size="24" />
        <span class="count-badge" v-if="favoritesCount > 0">{{ favoritesCountText }}</span>
      </button>

      <button class="cart-btn" aria-label="Carrinho" @click="toggleCart">
        <PhShoppingCart weight="fill" size="24" />
        <span class="count-badge" v-if="cartCount > 0">{{ cartCountText }}</span>
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

  a {
    color: var(--color-text);
    text-decoration: none;
  }
}

.actions {
  display: flex;
  align-items: center;
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

.cart-btn,
.favorites-btn {
  position: relative;

  .count-badge {
    position: absolute;
    top: -8px;
    right: -2px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    font-size: 10px;
    color: var(--white);
    border-radius: 50%;
    background-color: var(--color-primary);
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
