import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slices/pokemonSlice";
/* import favoriteReducer from './slices/favoriteSlice';
import searchReducer from './slices/searchSlice'; */

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    //favorites: favoriteReducer,
    //search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
