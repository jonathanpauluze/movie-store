import { ref, readonly } from 'vue'
import { fetchGenres } from '@/services/tmdb'
import { type MovieGenre } from '@/types/movie'

const genres = ref<MovieGenre[] | null>(null)
const loading = ref(false)
let loaded = false
let loadingPromise: Promise<void> | null = null

async function loadGenres() {
  if (loaded) return

  if (!loadingPromise) {
    loading.value = true
    loadingPromise = fetchGenres()
      .then((result) => {
        genres.value = result
        loaded = true
      })
      .catch((err) => {
        console.error('Erro ao buscar gêneros:', err)
        genres.value = []
      })
      .finally(() => {
        loading.value = false
        loadingPromise = null
      })
  }

  await loadingPromise
}

function resolve(genreIds: number[]): string[] {
  if (!genres.value) return []
  return genreIds
    .map((id) => genres.value!.find((g) => g.id === id)?.name)
    .filter((name): name is string => !!name)
}

export function useGenres() {
  loadGenres()
  return {
    genres: readonly(genres),
    loading: readonly(loading),
    resolve,
  }
}
