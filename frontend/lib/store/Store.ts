import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/lib/store/features/cart/CartSlice";

import favouriteReducer from "@/lib/store/features/cart/FavouriteSlice";

const rootReducer = combineReducers({
  cart: cartReducer,

  favourite: favouriteReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const store = makeStore();
