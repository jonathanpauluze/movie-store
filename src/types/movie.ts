export interface Movie {
  id: number
  genre_ids: number[]
  title: string
  release_date: string
  vote_average: number
  vote_count: number
  poster_path: string
}

export interface MovieGenre {
  id: number
  name: string
}
