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
