export interface AnimeProp {
  id: string;
  name: string;
  image: {
    original: string;
  };
  kind: string;
  episodes: number;
  episodes_aired: number;
  score: string;
}
export interface MovieProp {
  id: string;
  backdrop_path: string;
  genre_ids: number[];
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
}
export interface User {
  name: string;
  email: string;
  id: string;
}

export interface GenreTypes {
  id: string;
  name: string;
}

export type Movie = {
  id: number;
  original_title: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genre_ids: number[];
};

interface VideoData {
  key: string; // Assuming this is what you need
}

interface Genre {
  id: number;
  name: string;
}

// Define the types for the props that your page component expects
export interface SearchResultProps {
  searchedMovie: Movie | null;
  videoData: VideoData | null;
  currGenre: Genre[];
  recommendedMovies: Movie[];
}
