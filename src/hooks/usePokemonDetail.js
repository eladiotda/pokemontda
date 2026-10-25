import { useEffect, useState } from "react";
import { getPokemon } from "../api/pokeApi";

// Hook para traer la ficha de un pokemon
export default function usePokemonDetail(nameOrId) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      setNotFound(false);
      const data = await getPokemon(nameOrId);
      setPokemon(data);
    } catch (e) {
      // la api nos dice NOT_FOUND cuando responde 404
      if (e.message === "NOT_FOUND") {
        setNotFound(true);
      } else {
        setError("No pudimos cargar la ficha. Revisa tu conexión a internet.");
      }
    } finally {
      setLoading(false);
    }
  }

  // se vuelve a pedir SOLO si cambia el pokemon (nameOrId)
  useEffect(() => {
    load();
  }, [nameOrId]);

  return { pokemon, loading, error, notFound, retry: load };
}
