export interface Movie {
  id: number
  adult: boolean
  genre_ids: number[]
  title: string
  original_title: string
  release_date: string
  vote_average: number
  vote_count: number
  backdrop_path: string
  poster_path: string
}

export interface MovieGenre {
  id: number
  name: string
}
