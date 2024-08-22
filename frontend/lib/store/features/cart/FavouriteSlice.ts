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
        action.payload.genre.forEach((genre) => {
          if (!state.genreCounts[genre]) {
            state.genreCounts[genre] = 1;
          } else {
            state.genreCounts[genre]++;
          }
        });
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
