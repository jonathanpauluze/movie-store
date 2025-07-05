<script setup lang="ts">
import { computed } from 'vue'
import { PhTag, PhGlobe, PhCalendarBlank, PhStar, PhX } from '@phosphor-icons/vue'
import AppModal from './AppModal.vue'
import AppButton from './AppButton.vue'
import { useStore } from '@/store'
import { useGenres } from '@/composables/useGenres'
import { formatDate } from '@/utils/date'
import type { Movie } from '@/types/movie'

type PropsType = {
  open: boolean
  movie: Movie | null
}
const props = defineProps<PropsType>()

const emit = defineEmits(['close'])

const store = useStore()
const { resolve } = useGenres()
const genres = computed(() => resolve(props?.movie?.genre_ids ?? []))

const backdropPath = computed(() => {
  if (props.movie?.backdrop_path) {
    return `https://image.tmdb.org/t/p/w500${props.movie?.backdrop_path}`
  }

  return new URL('@/assets/images/no-poster.png', import.meta.url).href
})

const isInCart = computed(() => store.getters['cart/isInCart'](props.movie?.id))

function addToCart() {
  store.dispatch('cart/tryAddToCart', props.movie)
  emit('close')
}
</script>

<template>
  <AppModal :open="open" @close="$emit('close')">
    <div class="backdrop-box" :style="{ backgroundImage: `url(${backdropPath})` }">
      <h3>{{ movie?.title }}</h3>
    </div>

    <div class="content-box">
      <div class="movie-info-wrapper">
        <div class="movie-info">
          <PhTag :size="18" />
          <p><strong>Gênero:</strong> {{ genres.join(', ') }}</p>
        </div>

        <div class="movie-info">
          <PhGlobe :size="18" />
          <p><strong>Título original:</strong> {{ movie?.original_title }}</p>
        </div>

        <div class="movie-info">
          <PhCalendarBlank :size="18" />
          <p><strong>Lançamento:</strong> {{ formatDate(movie?.release_date ?? '') }}</p>
        </div>

        <div class="movie-info">
          <PhStar :size="18" />
          <p><strong>Nota:</strong> {{ movie?.vote_average.toFixed(1) }}</p>
        </div>
      </div>

      <AppButton fullWidth @click="addToCart" :disabled="isInCart" :aria-disabled="isInCart">
        {{ isInCart ? 'Adicionado' : 'Adicionar' }} ao carrinho
      </AppButton>

      <button aria-label="Fechar" class="close-btn" @click="$emit('close')">
        <PhX :size="18" />
      </button>
    </div>
  </AppModal>
</template>

<style scoped scss>
.backdrop-box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
  height: 200px;
  padding: 0 0.5rem 1rem;
  background-size: cover;
  background-position: center;

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    z-index: 1;
    color: var(--white);
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9));
  }
}

.content-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  text-align: center;

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  .movie-info-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;

    .movie-info {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      color: var(--color-text-secondary);
      font-size: 0.875rem;

      p {
        color: var(--color-text-light);

        strong {
          color: var(--color-text);
          font-weight: 600;
        }
      }

      svg {
        color: var(--color-icon);
      }
    }
  }
}

.close-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background-color: transparent;
  border: none;
  color: var(--white);
  cursor: pointer;
}
</style>
