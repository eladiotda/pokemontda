import { useEffect, useState } from "react";
import { getAllPokemon } from "../api/pokeApi";
import { filterPokemons } from "../utils/search";

// Hook del buscador: trae la lista completa UNA vez y filtra por lo que se escribe
export default function usePokemonSearch(query) {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadAll() {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPokemon();
      setAllPokemons(data);
    } catch (e) {
      setError("No pudimos buscar. Revisa tu conexión a internet.");
    } finally {
      setLoading(false);
    }
  }

  // la lista completa se pide solo la primera vez que el usuario escribe algo
  // (si ya la tenemos, o ya la estamos pidiendo, no se vuelve a pedir)
  useEffect(() => {
    if (query !== "" && allPokemons.length === 0 && !loading && !error) {
      loadAll();
    }
  }, [query]);

  return {
    results: filterPokemons(allPokemons, query),
    loading,
    error,
    retry: loadAll,
  };
}
