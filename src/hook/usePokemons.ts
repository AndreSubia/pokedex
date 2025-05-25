import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons } from "../store/slices/pokemonSlice";
import type { AppDispatch, RootState } from "../store/store";

export const usePokemons = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pokemons, loading, error, currentPage } = useSelector(
    (state: RootState) => state.pokemon,
  );

  const loadMore = useCallback(() => {
    if (!loading) {
      dispatch(fetchPokemons(currentPage));
    }
  }, [loading, currentPage, dispatch]);

  useEffect(() => {
    if (pokemons.length === 0) {
      loadMore();
    }
  }, [loadMore, pokemons.length]);

  return { pokemons, loading, error, loadMore };
};
