import { type MovieGenre } from '@/types/movie'

const API_URL = import.meta.env.VITE_TMDB_API_URL
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export async function fetchPopularMovies(page = 1) {
  const res = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`)

  if (!res.ok) {
    throw new Error('Erro ao buscar filmes')
  }

  const data = await res.json()
  return {
    results: data.results,
    total_pages: data.total_pages,
  }
}

export async function fetchGenres() {
  const res = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`)

  if (!res.ok) {
    throw new Error('Erro ao buscar filmes')
  }

  const data = await res.json()
  return data.genres as MovieGenre[]
}

export async function searchMovies(query: string, page = 1) {
  const queryStr = encodeURIComponent(query)
  const res = await fetch(
    `${API_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${queryStr}&page=${page}`,
  )

  if (!res.ok) {
    throw new Error('Erro ao buscar filmes')
  }

  const data = await res.json()
  return {
    results: data.results,
    total_pages: data.total_pages,
  }
}
