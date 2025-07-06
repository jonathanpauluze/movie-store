<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppButton from './AppButton.vue'
import { PhStar, PhHeart } from '@phosphor-icons/vue'
import confetti from 'canvas-confetti'
import { useGenres } from '@/composables/useGenres'
import { getPrice } from '@/utils/getPrice'

import { formatCurrency } from '@/utils/formatCurrency'
import { type Movie } from '@/types/movie'

type PropsType = { movie: Movie }
const props = defineProps<PropsType>()

type EmitType = (event: 'add-to-cart' | 'select-movie', movie: Movie) => void
const emit = defineEmits<EmitType>()

const store = useStore()
const { resolve } = useGenres()
const genres = computed(() => resolve(props.movie.genre_ids))
const price = computed(() => formatCurrency(getPrice(props.movie.id)))
const isFavorited = computed(() => store.getters['favorites/isFavorite'](props.movie.id))
const imageUrl = computed(() => {
  if (props.movie.poster_path) return `https://image.tmdb.org/t/p/w300${props.movie.poster_path}`

  return new URL('@/assets/images/no-poster.png', import.meta.url).href
})
const isInCart = computed(() => store.getters['cart/isInCart'](props.movie?.id))

function toggleFavorite(event: MouseEvent) {
  const isRemoving = isFavorited.value

  store.commit('favorites/toggleFavorite', props.movie)

  if (!isRemoving) {
    const button = (event.currentTarget as HTMLElement) || (event.target as HTMLElement)

    const icon = button.querySelector('.heart-icon')
    if (icon) {
      icon.classList.add('animate')
      setTimeout(() => icon.classList.remove('animate'), 300)
    }

    const rect = button.getBoundingClientRect()
    confetti({
      particleCount: 60,
      spread: 80,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      scalar: 0.6,
      zIndex: 9999,
    })
  }
}
</script>

<template>
  <div class="card">
    <img :src="imageUrl" :alt="movie.title" class="poster" />

    <div class="info">
      <h3 class="title" :title="movie.title">{{ movie.title }}</h3>

      <div class="rating-and-genres">
        <div class="rating">
          <PhStar aria-label="Nota" size="16" weight="fill" />
          <span>{{ movie.vote_average.toFixed(1) }}</span>
        </div>

        {{ genres[0] }}
      </div>

      <div class="price">
        <span class="price-value">{{ price }}</span>
      </div>

      <AppButton
        class="details-btn"
        fullWidth
        size="sm"
        variant="outline"
        aria-label="Ver detalhes de {{ movie.title }}"
        @click="emit('select-movie', movie)"
      >
        Ver detalhes
      </AppButton>

      <AppButton
        class="cart-btn"
        :disabled="isInCart"
        fullWidth
        size="sm"
        aria-label="Adicionar {{ movie.title }} ao carrinho"
        @click="emit('add-to-cart', movie)"
      >
        {{ isInCart ? 'Adicionado' : 'Adicionar' }}
      </AppButton>
    </div>

    <button
      class="favorite-btn"
      :class="{ 'is-favorited': isFavorited }"
      :aria-label="isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
      @click="toggleFavorite($event)"
    >
      <PhHeart class="heart-icon" :weight="isFavorited ? 'fill' : 'regular'" size="20" />
    </button>
  </div>
</template>

<style scoped scss>
@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}

.card {
  position: relative;
  background-color: var(--color-background-mute);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 4px var(--color-shadow);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}

.cart-btn {
  &:disabled {
    background-color: var(--color-background-soft);
    opacity: 0.9;
  }
}

.favorite-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background-color: var(--color-background-mute);
  color: var(--color-text-light);
  cursor: pointer;

  &.is-favorited {
    color: var(--color-danger);
  }

  .heart-icon {
    &.animate {
      animation: pop 0.3s ease;
    }
  }
}

.poster {
  width: 100%;
  height: 100%;
  display: block;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  background-color: var(--color-background-soft);
}

.info {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title {
  font-size: 0.95rem;
  font-weight: bold;
  line-height: 1.2;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.4em;
}

.rating-and-genres {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--color-text-light);
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--color-primary);
}

.price-value {
  font-size: 1.125rem;
  font-weight: bold;
  color: var(--color-text);
}
</style>
