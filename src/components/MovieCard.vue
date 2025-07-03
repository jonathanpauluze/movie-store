<script setup lang="ts">
import { computed } from 'vue'
import AppButton from './AppButton.vue'
import { PhStar } from '@phosphor-icons/vue'
import { useGenres } from '@/composables/useGenres'
import { getPrice } from '@/utils/getPrice'
import { formatCurrency } from '@/utils/formatCurrency'
import { type Movie } from '@/types/movie'

type PropsType = { movie: Movie }
const props = defineProps<PropsType>()

type EmitType = (event: 'add-to-cart', movie: Movie) => void
const emit = defineEmits<EmitType>()

const { resolve } = useGenres()
const genres = computed(() => resolve(props.movie.genre_ids))
const price = computed(() => formatCurrency(getPrice(props.movie.id)))

function getPoster(path: string) {
  return `https://image.tmdb.org/t/p/w300${path}`
}
</script>

<template>
  <div class="card">
    <img :src="getPoster(movie.poster_path)" :alt="movie.title" class="poster" />

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
        fullWidth
        size="sm"
        aria-label="Adicionar {{ movie.title }} ao carrinho"
        @click="emit('add-to-cart', movie)"
      >
        Adicionar
      </AppButton>
    </div>
  </div>
</template>

<style scoped scss>
.card {
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

.poster {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
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
