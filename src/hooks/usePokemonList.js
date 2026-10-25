import { useEffect, useRef, useState } from "react";
import { getPokemonList } from "../api/pokeApi";

// Hook con toda la logica de la lista: cargar los primeros 20 y luego 20 mas
export default function usePokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true); // primera carga
  const [loadingMore, setLoadingMore] = useState(false); // cuando bajamos al final
  const [error, setError] = useState(null);

  // useRef para saber si ya estamos pidiendo datos.
  // onEndReached a veces se dispara 2 veces seguidas y sin esto se repiten pokemon
  const isFetching = useRef(false);

  async function loadFirstPage() {
    try {
      setLoading(true);
      setError(null);
      const data = await getPokemonList(0);
      setPokemons(data);
      setOffset(20);
    } catch (e) {
      setError("No pudimos cargar los Pokémon. Revisa tu conexión a internet.");
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    // si ya estamos cargando no hacemos nada
    if (isFetching.current || loading) return;
    isFetching.current = true;

    try {
      setLoadingMore(true);
      const data = await getPokemonList(offset);
      // agregamos los nuevos al final de los que ya teniamos
      setPokemons((prev) => [...prev, ...data]);
      setOffset(offset + 20);
    } catch (e) {
      // si falla al cargar mas no borramos la lista, solo lo mostramos en consola
      console.log("Error cargando mas pokemon", e);
    } finally {
      setLoadingMore(false);
      isFetching.current = false;
    }
  }

  // [] vacio = se ejecuta solo una vez cuando se abre la pantalla
  // (si no ponemos el array la peticion se repetiria sin parar)
  useEffect(() => {
    loadFirstPage();
  }, []);

  return {
    pokemons,
    loading,
    loadingMore,
    error,
    loadMore,
    retry: loadFirstPage,
  };
}
