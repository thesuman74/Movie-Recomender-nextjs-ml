import { Movie } from "@/app/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavouriteState {
  Movie: Movie[];
}
interface FavouriteState {
  Movie: Movie[];
  loading: boolean;
  error: string | null;
}

const loadInitialState = (): FavouriteState => {
  if (typeof window !== "undefined") {
    const itemsFromStorage = localStorage.getItem("Restaurant");
    return {
      Movie: itemsFromStorage ? JSON.parse(itemsFromStorage) : [],
      loading: false,
      error: null,
    };
  }
  return {
    Movie: [],
    loading: false,
    error: null,
  };
};

const initialState: FavouriteState = loadInitialState();

const favouriteSlice = createSlice({
  name: "FavouriteSlice",
  initialState,

  reducers: {
    addRestaurant: (state, action: PayloadAction<Movie>) => {
      const existingRestaurant = state.Movie.find(
        (Movie) => Movie.id === action.payload.id
      );
      if (!existingRestaurant) {
        const newOffer = { ...action.payload };
        state.Movie.push(newOffer);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("Restaurant", JSON.stringify(state.Movie));
      }
    },

    // removeRestaurant: (state, action: PayloadAction<string>) => {
    //   const existingRestaurant = state.Movie.find(
    //     (Movie) => Movie.id === action.payload
    //   );
    //   if (existingRestaurant) {
    //     state.Movie = state.Movie.filter(
    //       (item) => item.id !== action.payload
    //     );
    //   }

    //   if (typeof window !== "undefined") {
    //     localStorage.setItem("Restaurant", JSON.stringify(state.Movie));
    //   }
    // },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addRestaurant, setLoading, setError } = favouriteSlice.actions;

export default favouriteSlice.reducer;
