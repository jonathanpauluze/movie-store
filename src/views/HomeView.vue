<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { fetchPopularMovies, searchMovies } from '@/services/tmdb'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import BackToTop from '@/components/BackToTop.vue'
import MovieCard from '@/components/MovieCard.vue'
import MovieDetailsModal from '@/components/MovieDetailsModal.vue'
import type { Movie } from '@/types/movie'
import { debounce } from '@/utils/debounce'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'

type PropsType = { search?: string }
const props = defineProps<PropsType>()

const movies = ref<Movie[]>([])
const isLoading = ref(true)
const error = ref('')
const currentPage = ref(1)
const hasMore = ref(true)
const totalPages = ref<number | null>(null)
const showSelectedMovieModal = ref(false)
const selectedMovie = ref<Movie | null>(null)

const store = useStore()

const debouncedSearch = debounce(async (term) => {
  const searchTerm = (term as string)?.trim()

  if (!searchTerm || searchTerm.length < 2) {
    await loadPopular()
    return
  }

  try {
    isLoading.value = true
    currentPage.value = 1

    const res = await searchMovies(searchTerm)
    movies.value = res.results
    totalPages.value = res.total_pages
  } catch (err: unknown) {
    error.value = (err as Error).message || 'Erro na busca'
  } finally {
    isLoading.value = false
  }
}, 1000)

watch(
  () => props.search,
  (term) => {
    const trimmed = term?.trim()

    isLoading.value = true
    movies.value = []
    currentPage.value = 1
    hasMore.value = true

    debouncedSearch(trimmed)
  },
)

function addToCart(movie: Movie) {
  store.dispatch('cart/tryAddToCart', movie)
}

function openMovieDetails(movie: Movie) {
  showSelectedMovieModal.value = true
  selectedMovie.value = movie
}

async function loadPopular() {
  try {
    isLoading.value = true

    const res = await fetchPopularMovies()
    movies.value = res.results
    totalPages.value = res.total_pages
    hasMore.value = currentPage.value < res.total_pages
  } catch (err: unknown) {
    error.value = (err as Error).message || 'Erro ao carregar filmes'
  } finally {
    isLoading.value = false
  }
}

async function loadMore() {
  if (isLoading.value || !hasMore.value) return

  isLoading.value = true
  currentPage.value++

  try {
    let newMovies

    if (props.search && props.search.trim().length >= 2) {
      const res = await searchMovies(props.search, currentPage.value)
      newMovies = res.results
    } else {
      const res = await fetchPopularMovies(currentPage.value)
      newMovies = res.results
    }

    if (newMovies.length === 0) {
      hasMore.value = false
    } else {
      movies.value.push(...newMovies)
    }
  } catch (err: unknown) {
    error.value = (err as Error).message || 'Erro ao carregar mais filmes'
  } finally {
    isLoading.value = false
  }
}

function handleDetailsClose() {
  showSelectedMovieModal.value = false
}

useInfiniteScroll(loadMore)

onMounted(loadPopular)
</script>

<template>
  <div>
    <section>
      <h1>{{ search ? `Resultados para "${search}"` : 'Filmes Populares' }}</h1>

      <LoadingSpinner v-if="isLoading && movies.length === 0" />

      <p v-if="error">{{ error }}</p>

      <div v-else class="movie-grid">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @add-to-cart="addToCart"
          @select-movie="openMovieDetails"
        />
      </div>

      <LoadingSpinner
        v-if="isLoading && movies.length !== 0 && hasMore"
        text="Carregando mais..."
      />

      <p class="end-message" v-if="!hasMore">Você chegou ao fim da lista.</p>

      <p class="no-results" v-if="!isLoading && movies.length === 0">
        Nenhum resultado encontrado para "{{ props.search }}"
      </p>
    </section>
  </div>

  <MovieDetailsModal
    :open="showSelectedMovieModal"
    :movie="selectedMovie"
    @close="handleDetailsClose"
  />

  <BackToTop />
</template>

<style scoped scss>
h1 {
  color: var(--color-heading);
  font-size: 2rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
}

.loader {
  font-size: 2rem;
  text-align: center;
  color: var(--color-text-light);
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 1rem;
  row-gap: 2rem;
  margin-top: 1rem;

  img {
    width: 100%;
    border-radius: 0.5rem;
  }
}
</style>
