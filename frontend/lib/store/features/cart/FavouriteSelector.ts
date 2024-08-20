import { MovieRedux } from "@/app/types";
import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./FavouriteSlice";

const selectMovies = (state: typeof initialState) => state.movies;

const selectGenreCounts = createSelector(
  [selectMovies],
  (movies: MovieRedux[]) => {
    const genreCounts: { [genre: string]: number } = {};
    movies.forEach((movie: MovieRedux) => {
      movie.genre.forEach((genre: string) => {
        if (!genreCounts[genre]) {
          genreCounts[genre] = 0;
        }
        genreCounts[genre]++;
      });
    });
    return genreCounts;
  }
);
export { selectGenreCounts };
