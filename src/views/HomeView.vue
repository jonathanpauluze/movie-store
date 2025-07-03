<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { fetchPopularMovies } from '@/services/tmdb'
import MovieCard from '@/components/MovieCard.vue'
import type { Movie } from '@/types/movie'

const movies = ref<Movie[]>([])
const isLoading = ref(true)
const error = ref('')

const store = useStore()

function addToCart(movie: Movie) {
  store.dispatch('cart/tryAddToCart', movie)
}

onMounted(async () => {
  try {
    movies.value = await fetchPopularMovies()
  } catch (err: unknown) {
    error.value = (err as Error).message || 'Erro ao carregar filmes'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <section>
      <h1>Filmes Populares</h1>

      <p v-if="isLoading">Carregando...</p>
      <p v-if="error">{{ error }}</p>

      <div v-else class="movie-grid">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @add-to-cart="addToCart"
        />
      </div>
    </section>
  </div>
</template>

<style scoped scss>
h1 {
  color: var(--color-heading);
  font-size: 2rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
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
