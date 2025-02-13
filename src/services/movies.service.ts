import { API_KEY } from '../constants/constants';
import { BASE_URL } from '../constants/urls';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export const moviesService = {
  async getPopularMovies(page = 1): Promise<MovieResponse> {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false&include_video=false&sort_by=popularity.desc`,
    );
    if (!response.ok) throw new Error('Failed to fetch popular movies');
    return response.json();
  },

  async searchMovies(query: string, page = 1): Promise<MovieResponse> {
    if (!query) throw new Error('Query is required');
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${page}`,
    );
    if (!response.ok) throw new Error('Failed to search movies');
    return response.json();
  },
};
