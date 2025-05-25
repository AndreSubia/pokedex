import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  NamedAPIResource,
  NamedAPIResourceList,
  PokemonClient,
} from "pokenode-ts";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
  currentPage: number;
}

const initialState: PokemonState = {
  pokemons: [],
  loading: false,
  error: null,
  currentPage: 1,
};

const api = new PokemonClient();

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (page: number) => {
    const limit = 20;
    const offset = (page - 1) * limit;
    const response = await api.listPokemons(offset, limit);
    return response;
  },
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = [...state.pokemons, ...action.payload.results];
        state.currentPage += 1;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default pokemonSlice.reducer;
