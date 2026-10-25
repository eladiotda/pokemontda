import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import EmptyMessage from "../components/EmptyMessage";
import usePokemonList from "../hooks/usePokemonList";
import usePokemonSearch from "../hooks/usePokemonSearch";
import { cleanSearch } from "../utils/search";

// Pantalla de la lista: buscador arriba y cuadricula abajo
export default function ListScreen({ onSelect }) {
  const { pokemons, loading, loadingMore, error, loadMore, retry } =
    usePokemonList();

  // lo que el usuario escribio, ya limpio ("" = no esta buscando)
  const [query, setQuery] = useState("");
  const search = usePokemonSearch(query);
  const searching = query !== "";

  function handleSearch(text) {
    setQuery(cleanSearch(text));
  }

  // decide que mostrar debajo del buscador
  function renderContent() {
    if (searching) {
      if (search.loading) {
        return <Loading text="Buscando..." />;
      }
      if (search.error) {
        return <ErrorMessage message={search.error} onRetry={search.retry} />;
      }
      if (search.results.length === 0) {
        return (
          <EmptyMessage
            message={`No encontramos "${query}". Revisa el nombre o el número.`}
          />
        );
      }
    } else {
      if (loading) {
        return <Loading text="Cargando Pokémon..." />;
      }
      if (error) {
        return <ErrorMessage message={error} onRetry={retry} />;
      }
    }

    return (
      <FlatList
        // si esta buscando mostramos los resultados, si no la lista normal
        data={searching ? search.results : pokemons}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PokemonCard pokemon={item} onPress={() => onSelect(item.id)} />
        )}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled" // que el primer toque abra la ficha aunque el teclado este abierto
        // los resultados ya vienen todos, la lista infinita es solo sin busqueda
        onEndReached={searching ? undefined : loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore && !searching ? (
            <View style={styles.footer}>
              <ActivityIndicator color="#D7263D" />
              <Text style={styles.footerText}>Cargando más...</Text>
            </View>
          ) : null
        }
      />
    );
  }

  return (
    <View style={styles.screen}>
      <SearchBar onSearch={handleSearch} />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  list: {
    padding: 6,
    paddingBottom: 30,
  },
  footer: {
    padding: 16,
    alignItems: "center",
  },
  footerText: {
    color: "#666",
    marginTop: 4,
  },
});
