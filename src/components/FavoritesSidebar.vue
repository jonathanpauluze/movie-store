<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppTooltip from './AppTooltip.vue'
import AppButton from './AppButton.vue'
import { PhHeartStraightBreak, PhShoppingCart } from '@phosphor-icons/vue'
import { formatCurrency } from '@/utils/formatCurrency'
import { getPrice } from '@/utils/getPrice'
import type { Movie } from '@/types/movie'

type PropsType = { open: boolean }
defineProps<PropsType>()
type EmitType = (event: 'close') => void
const emit = defineEmits<EmitType>()

const store = useStore()
const favorites = computed(() => store.state.favorites.items)

function close() {
  emit('close')
}

function addToCart(movie: Movie) {
  store.dispatch('cart/tryAddToCart', movie)
}

function remove(id: number) {
  store.commit('favorites/removeFavorite', id)
}

function clearFavorites() {
  store.commit('favorites/clearFavorites')
}

function getPoster(path: string) {
  return `https://image.tmdb.org/t/p/w200${path}`
}
</script>

<template>
  <AppSidebar :open="open" @close="close" side="right">
    <div class="sidebar-header">
      <h2>Favoritos</h2>
      <AppButton v-if="favorites.length" variant="link" @click="clearFavorites" class="clear-btn">
        Esvaziar
      </AppButton>
    </div>

    <div class="sidebar-content">
      <div v-if="favorites.length === 0" class="empty">Nenhum filme favorito</div>

      <ul class="favorites-list" v-else>
        <li v-for="movie in favorites" :key="movie.id" class="favorite-item">
          <img :src="getPoster(movie.poster_path)" alt="" />

          <p class="title" :title="movie.title">{{ movie.title }}</p>

          <p class="price">{{ formatCurrency(getPrice(movie.id)) }}</p>

          <div class="actions">
            <AppTooltip :text="`Adicionar ${movie.title} ao carrinho`" position="left">
              <button
                :aria-label="`Adicionar ${movie.title} ao carrinho`"
                class="cart-btn"
                @click="addToCart(movie)"
              >
                <PhShoppingCart size="20" weight="fill" />
              </button>
            </AppTooltip>

            <AppTooltip text="Remover dos favoritos" position="left">
              <button
                aria-label="Remover dos favoritos"
                class="remove-btn"
                @click="remove(movie.id)"
              >
                <PhHeartStraightBreak size="20" weight="fill" />
              </button>
            </AppTooltip>
          </div>
        </li>
      </ul>
    </div>
  </AppSidebar>
</template>

<style scoped sass>
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-weight: bold;
  border-bottom: 1px solid var(--color-border);

  h2 {
    font-size: 1.125rem;
  }
}

.sidebar-content {
  flex: 1;
  padding: 1rem;
}

.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.favorite-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;

  img {
    width: 40px;
    height: 60px;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    background-color: var(--color-background-soft);
  }

  .title {
    flex: 1;

    font-weight: 600;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    flex: 0.5;
    font-weight: bold;
    color: var(--color-text);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 0.125rem;
  }

  .cart-btn {
    background: transparent;
    border: none;
    color: var(--color-text-light);
    cursor: pointer;

    &:hover {
      color: var(--color-success);
    }
  }

  .remove-btn {
    background: transparent;
    border: none;
    color: var(--color-text-light);
    cursor: pointer;

    &:hover {
      color: var(--color-text);
    }
  }
}

.empty {
  text-align: center;
  color: var(--color-text-light);
}
</style>
