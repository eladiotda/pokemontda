import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PokemonCard from "../components/PokemonCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import usePokemonList from "../hooks/usePokemonList";

// Pantalla de la lista. La logica esta en el hook, aqui solo mostramos
export default function ListScreen({ onSelect }) {
  const { pokemons, loading, loadingMore, error, loadMore, retry } =
    usePokemonList();

  if (loading) {
    return <Loading text="Cargando Pokémon..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={retry} />;
  }

  return (
    // FlatList y no ScrollView + map porque solo pinta lo que se ve en pantalla
    <FlatList
      data={pokemons}
      numColumns={2}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <PokemonCard pokemon={item} onPress={() => onSelect(item.id)} />
      )}
      contentContainerStyle={styles.list}
      onEndReached={loadMore} // cuando llegamos al final pedimos 20 mas
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loadingMore ? (
          <View style={styles.footer}>
            <ActivityIndicator color="#D7263D" />
            <Text style={styles.footerText}>Cargando más...</Text>
          </View>
        ) : null
      }
    />
  );
}

const styles = StyleSheet.create({
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
