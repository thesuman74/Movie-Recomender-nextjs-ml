import { MovieRedux } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "lucide-react";

interface FavouriteState {
  movies: MovieRedux[];
  loading: boolean;
  error: string | null;
  genreCounts: { [genre: string]: number };
}

const initialState: FavouriteState = {
  movies: [],
  loading: false,
  error: null,
  genreCounts: {},
};

const favouriteSlice = createSlice({
  name: "favoriteMovies",
  initialState,
  reducers: {
    addMovietoFavourite: (state, action: PayloadAction<MovieRedux>) => {
      const existingMovie = state.movies.find(
        (movie) => movie.title === action.payload.title
      );
      if (!existingMovie) {
        state.movies.push(action.payload);
        // Update genreCounts
        action.payload.genre?.forEach((genre) => {
          if (!state.genreCounts[genre]) {
            state.genreCounts[genre] = 1;
          } else {
            state.genreCounts[genre]++;
          }
        });
        // Store data in local storage
        localStorage.setItem("favoriteMovies", JSON.stringify(state.movies));
        console.log("Data stored in local storage:", state.movies);
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    revertAddMovieToFavourite: (state, action: PayloadAction<MovieRedux>) => {
      const index = state.movies.findIndex(
        (movie) => movie.title === action.payload.title
      );
      if (index !== -1) {
        state.movies.splice(index, 1);
        // Revert genreCounts
        action.payload.genre?.forEach((genre) => {
          state.genreCounts[genre]--;
          if (state.genreCounts[genre] === 0) {
            delete state.genreCounts[genre];
          }
        });
      }
    },
    removeMovieFromFavourite: (state, action: PayloadAction<MovieRedux>) => {
      const index = state.movies.findIndex(
        (movie) => movie.title === action.payload.title
      );
      if (index !== -1) {
        state.movies.splice(index, 1);
        // Revert genreCounts
        action.payload.genre?.forEach((genre) => {
          state.genreCounts[genre]--;
          if (state.genreCounts[genre] === 0) {
            delete state.genreCounts[genre];
          }
        });
        // Update local storage
        localStorage.setItem("favoriteMovies", JSON.stringify(state.movies));
      }
    },
    initializeFromLocalStorage: (state) => {
      const storedMovies = localStorage.getItem("favoriteMovies");
      if (storedMovies) {
        state.movies = JSON.parse(storedMovies);
        // Update genreCounts from stored data
        state.movies.forEach((movie) => {
          movie.genre?.forEach((genre) => {
            if (!state.genreCounts[genre]) {
              state.genreCounts[genre] = 1;
            } else {
              state.genreCounts[genre]++;
            }
          });
        });
      }
    },
  },
});

export const {
  addMovietoFavourite,
  setLoading,
  setError,
  revertAddMovieToFavourite,
  initializeFromLocalStorage,
} = favouriteSlice.actions;

export default favouriteSlice.reducer;

export const getTopGenres = (state: FavouriteState) => {
  const genreCounts = state.genreCounts;
  const totalCount = Object.values(genreCounts).reduce(
    (acc, count) => acc + count,
    0
  );
  const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);

  // Calculate percentage of each genre
  const genresWithPercentages = sortedGenres.map(([genre, count]) => {
    const percentage = ((count / totalCount) * 100).toFixed(2); // Round to 2 decimal places
    return { genre, percentage };
  });

  return genresWithPercentages.slice(0, 3); // Take the top 3 genres
};

// // API service
// export const addMovieToFavouriteApi = async (movie: MovieRedux) => {
//   console.log("Calling API route");
//   try {
//     const payload = {
//       id: movie.id,
//       title: movie.title,
//       genre: movie.genre,
//     };
//     await axios.post("/api/user/FavoriteMovies", payload);
//   } catch (error) {
//     console.error(error);
//     // Revert the Redux state if the API call fails
//     favouriteSlice.actions.revertAddMovieToFavourite(movie);
//   }
// };
