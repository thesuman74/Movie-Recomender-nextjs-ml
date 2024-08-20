import { Movie } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieRedux {
  id: string;
  title: string;
  genre: string[];
}

interface FavouriteState {
  movies: MovieRedux[];
  loading: boolean;
  error: string | null;
}

const initialState: FavouriteState = {
  movies: [],
  loading: false,
  error: null,
};

const favouriteSlice = createSlice({
  name: "favoriteMovies",
  initialState,
  reducers: {
    addMovietoFavourite: (state, action: PayloadAction<MovieRedux>) => {
      console.log("Movie added successfully", action.payload);
      const existingMovie = state.movies.find(
        (movie) => movie.title === action.payload.title
      );
      if (!existingMovie) {
        state.movies.push(action.payload);
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addMovietoFavourite, setLoading, setError } =
  favouriteSlice.actions;
export default favouriteSlice.reducer;
